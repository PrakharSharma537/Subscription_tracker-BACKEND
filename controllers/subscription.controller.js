import SubscriptionModel from '../models/subscription.model.js'
export const createSubscription = async(req,res,next)=>{
    try {
        const subscription = await SubscriptionModel.create({
            ...req.body,
            user:req.user._id
        })
        res.status(201).json({subscription})
    } catch (error) {
        console.log(error)
    }
}
export const getUserSubscription = async(req,res,next)=>{
    try {
        if(req.user.id !== req.params.id){
            return res.status(401).json({message:"You Are Not Owner of this Account"})
        }
        const subscriptions = await SubscriptionModel.find({user:req.params.id})
        res.status(200).json({subscriptions});
    } catch (error) {
        console.log(error)
    }
}
export const getSubscription = async(req,res) =>{
    try {
        const existingSubscription = await SubscriptionModel.find({email})
        if(!existingSubscription){
            return res.status(200).json({message:"No Subscriptions"})
        }
        return res.status(201).json({
            data:existingSubscription
        })
        
    } catch (error) {
        console.log(error)
    }

}
export const deleteSubscription = async(req,res)=>{
    const {id} = req.params;
    const existsUser = await SubscriptionModel.findById(id)
    if(!existsUser){
        return res.status(404).json({message:"No Subscriptions"})
    }
    await SubscriptionModel.findByIdAndDelete(id);

    res.status(200).json({ message: "User Subscription deleted successfully" });
    
}
export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, frequency, category, paymentMethod } = req.body;

    const subscription = await SubscriptionModel.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "No Subscription related to this account" });
    }

    if (!price || !frequency || !category || !paymentMethod) {
      return res.status(400).json({ message: "Please enter all details" });
    }
    const allowedFrequencies = ['daily','weekly','monthly','yearly'];
    const allowedCategories = ['sports','news','finance','devotional','entertainment','politics','technology','other'];

    if (!allowedFrequencies.includes(frequency)) {
      return res.status(400).json({ message: "Invalid frequency value" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category value" });
    }

    // Update fields
    subscription.price = price;
    subscription.frequency = frequency;
    subscription.category = category;
    subscription.paymentMethod = paymentMethod;

    await subscription.save();

    res.status(200).json({ message: "Subscription updated successfully", data: subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const subscription = await SubscriptionModel.findOne({ _id: id, user: userId });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found for this user" });
    }

    if (subscription.status !== 'active') {
      return res.status(400).json({ message: `Cannot cancel a ${subscription.status} subscription` });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({ message: "Subscription cancelled successfully", data: subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

