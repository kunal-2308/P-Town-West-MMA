export const tp = async(req,res) =>{
    try {
       return res.status(200).json({
        "messqge" : "health"
       });
    } catch (error) {
        res.status(400).json({
            "error" : "error mess"
        })
    }
};

