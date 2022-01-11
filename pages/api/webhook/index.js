import Stripe from 'stripe';
import {buffer} from 'micro';
import firebaseInit from '../../../firebase/initFirebase';
import { getDatabase, ref, onValue, set} from "firebase/database";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let event;
        const app = firebaseInit();
        const db = getDatabase(app);
        try {
            const rawBody = await buffer(req);
            const signature = req.headers['stripe-signature'];

            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const incompleteRef = ref(db, 'incomplete/' + session.id);
            onValue(incompleteRef, (snapshot)=> {
                const data = snapshot.val();
                set(incompleteRef, null);
                set(ref(db, 'complete/' + session.id), data)
            })

        } else if (event.type === 'checkout.session.expired') {
            const session = event.data.object;
            const incompleteRef = ref(db, 'incomplete/' + session.id);
            set(incompleteRef, null);
        }

        res.json({received: true});
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}