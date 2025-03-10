const listing=require("../models/listing.js")


module.exports.index=async (req,res)=>{
    let alllistings=await listing.find();
   
    res.render("listings/index.ejs",{ alllistings });
}

module.exports.createnew=async(req,res)=>{
    let path=req.file.path;
    let filename=req.file.filename;
    console.log(`${filename,path}` );
    console.log(req.user)
    let newlisting=new listing(req.body)
    newlisting.owner=req.user.id;
    newlisting.image.url=path;
    newlisting.image.filename=filename;
    let result=await newlisting.save();
    
    req.flash('success', 'New Listing has been added');
    res.redirect("/listings");
}

module.exports.showListing=async(req,res)=>{
    let { id }=req.params;
    console.log(id);
    let flisting=await listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate("owner");
    if(!flisting){
        req.flash('error', 'Cannot find that listing');
        return res.redirect("/listings");
    }   
   res.render("listings/show.ejs",{flisting});
}


module.exports.updateListing=async(req,res)=>{
    let { id }=req.params;
    console.log(id);
    let {description,price}=req.body;
     await listing.findByIdAndUpdate(id,{description:description,price:price});
     console.log("details has been updated");
     req.flash('success', 'Listing has been updated');
     res.redirect(`/listings/${ id }`);
    
}

module.exports.destroyListing=async(req,res)=>{
    let{ id }=req.params;
    console.log(id);
    await listing.findByIdAndDelete(id);
   req.flash('success', ' Listing has been deleted')
    res.redirect("/listings");
     
}