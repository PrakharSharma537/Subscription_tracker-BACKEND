import SubscriptionModel from '../models/subscription.model.js'
export const sendReminders = async (req, res) => {
    const today = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(today.getDate() + 7); // remind 7 days before expiry

    try {
        const subs = await SubscriptionModel.find({
            renewalDate: { $gte: today, $lte: reminderDate },
            status: 'active',
            notified: false
        }).populate('user'); // to get email

        for (const sub of subs) {
            // Send email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: sub.user.email,
                subject: 'Subscription Expiry Reminder',
                text: `Hello! Your subscription "${sub.name}" costing ₹${sub.price} will renew on ${sub.renewalDate.toDateString()}. Please take necessary action.`
            });

            // Mark as notified
            sub.notified = true;

            // Update status if expired
            if (sub.renewalDate < new Date()) {
                sub.status = 'expired';
            }

            await sub.save();
            console.log(`Reminder sent for subscription: ${sub.name}, Price: ${sub.price}`);
        }

        if (req) {
            return res.json({
                message: `${subs.length} reminders sent.`,
                subscriptions: subs.map(s => ({
                    name: s.name,
                    price: s.price,
                    renewalDate: s.renewalDate,
                    user: s.user.email
                }))
            });
        }

    } catch (err) {
        console.error('Error sending reminders:', err.message);
        if (req) return res.status(500).json({ error: err.message });
    }
};
