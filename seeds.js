var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
        {
            name: "Dog",
            image: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782",
            description: "Nunc placerat, nisi vel pellentesque egestas, neque risus commodo tellus, et rhoncus tellus velit nec massa. Proin tincidunt leo at lectus sollicitudin aliquam. Nunc finibus interdum diam semper ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam porttitor eros at leo pellentesque, vitae rutrum nisi convallis. Ut nibh libero, dictum malesuada rutrum ac, pulvinar at dui. Etiam eu accumsan quam, et gravida ante. Nam sagittis diam dui, eget blandit mi ultrices non. Nullam non leo mauris. Curabitur efficitur egestas ligula, vel sollicitudin leo posuere at. Etiam maximus scelerisque varius. Nullam id magna non nisi elementum viverra vel non tortor. Nulla scelerisque arcu nisl, egestas aliquam neque cursus quis. Fusce et sem nec leo luctus pellentesque. Integer quam sapien, cursus blandit egestas eu, congue blandit orci."
        },
        
        {
            name: "Cat",
            image: "https://www.thehappycatsite.com/wp-content/uploads/2018/02/Maine-Coon-Cats-HC-long-1024x555.jpg",
            description: "Nunc placerat, nisi vel pellentesque egestas, neque risus commodo tellus, et rhoncus tellus velit nec massa. Proin tincidunt leo at lectus sollicitudin aliquam. Nunc finibus interdum diam semper ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam porttitor eros at leo pellentesque, vitae rutrum nisi convallis. Ut nibh libero, dictum malesuada rutrum ac, pulvinar at dui. Etiam eu accumsan quam, et gravida ante. Nam sagittis diam dui, eget blandit mi ultrices non. Nullam non leo mauris. Curabitur efficitur egestas ligula, vel sollicitudin leo posuere at. Etiam maximus scelerisque varius. Nullam id magna non nisi elementum viverra vel non tortor. Nulla scelerisque arcu nisl, egestas aliquam neque cursus quis. Fusce et sem nec leo luctus pellentesque. Integer quam sapien, cursus blandit egestas eu, congue blandit orci."
        },
        
        {
            name: "Dolphin",
            image: "https://images2.minutemediacdn.com/image/upload/c_crop,h_1778,w_3155,x_0,y_843/f_auto,q_auto,w_1100/v1554928552/shape/mentalfloss/540093-istock-514343279.jpg",
            description: "Nunc placerat, nisi vel pellentesque egestas, neque risus commodo tellus, et rhoncus tellus velit nec massa. Proin tincidunt leo at lectus sollicitudin aliquam. Nunc finibus interdum diam semper ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam porttitor eros at leo pellentesque, vitae rutrum nisi convallis. Ut nibh libero, dictum malesuada rutrum ac, pulvinar at dui. Etiam eu accumsan quam, et gravida ante. Nam sagittis diam dui, eget blandit mi ultrices non. Nullam non leo mauris. Curabitur efficitur egestas ligula, vel sollicitudin leo posuere at. Etiam maximus scelerisque varius. Nullam id magna non nisi elementum viverra vel non tortor. Nulla scelerisque arcu nisl, egestas aliquam neque cursus quis. Fusce et sem nec leo luctus pellentesque. Integer quam sapien, cursus blandit egestas eu, congue blandit orci."
        },
                
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err,) {
        if (err) {
            console.log(err);
        }
        console.log("Remove campgrounds!");
        
        data.forEach(function(seed){
            Campground.create(seed, function (err, campground) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("Add animal");
                  //Add a few comments
                  Comment.create(
                      {
                      text: "This cat is cute",
                      author: "Kevin"
                  }, function(err,comment) {
                        if (err) {
                            console.log(err);   
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                  });

              }
            });
        });
        
    });
}
module.exports = seedDB;
