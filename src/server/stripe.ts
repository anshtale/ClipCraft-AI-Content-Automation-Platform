'use server'
import { redirect } from 'next/navigation';
import Stripe from 'stripe'
import { auth } from './auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

export async function createCheckoutSession(credits: number){
    const user_session = await auth();

    if(!user_session || !user_session.user.id){
        throw new Error('Unauthorized Access')
    }

    const userId = user_session.user.id;

    const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ['card'],
        line_items:[
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `${credits} Caption-Generator Credits`
                    },
                    unit_amount: Math.round((credits*60))
                },
                quantity: 1
            }
        ],
        customer_creation: 'always',
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
        client_reference_id: userId.toString(),
        metadata: {
            credits
        }
    })

    return redirect(session.url!)
}



