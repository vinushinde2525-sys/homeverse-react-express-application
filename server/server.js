// server.js — Homeverse Express API

process.on("uncaughtException", (err) => {
    console.error("CRASH uncaughtException:", err.stack);
});

process.on("unhandledRejection", (err) => {
    console.error("CRASH unhandledRejection:", err);
});


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const http = require("http");


const app = express();


// Render gives PORT automatically
const PORT = process.env.PORT || 3001;



// ===============================
// Middleware
// ===============================


app.use(helmet());


// CORS
app.use(
    cors({
        origin: [
            "http://localhost:5173",

            // replace this after Netlify deployment
            "https://your-netlify-app.netlify.app"
        ],

        credentials:true
    })
);



app.use(express.json());

app.use(
    express.urlencoded({
        extended:true
    })
);


// Logger
app.use((req,res,next)=>{

    console.log(
        `${req.method} ${req.url}`
    );

    next();

});





// ===============================
// JSON DATABASE
// ===============================


const DATA_DIR = path.join(
    __dirname,
    "data"
);



const read = (file)=>{

    return JSON.parse(
        fs.readFileSync(
            path.join(DATA_DIR,file),
            "utf-8"
        )
    );

};





// ===============================
// Health Check
// ===============================


app.get(
    "/api/health",
    (req,res)=>{

        res.json({

            success:true,

            message:
            "Homeverse API running"

        });

    }
);






// ===============================
// Properties
// ===============================



app.get(
"/api/properties/featured",
(req,res)=>{


try{


const properties =
read("properties.json");


res.json({

success:true,

data:
properties.filter(
p=>p.isFeatured
)

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


});






app.get(
"/api/properties/popular-locations",
(req,res)=>{


try{


const map={};


read("properties.json")
.forEach(p=>{


if(!map[p.location.city]){


map[p.location.city]={


city:p.location.city,

state:p.location.state,

count:0,

thumbnail:p.thumbnail


};


}


map[p.location.city].count++;


});



res.json({

success:true,

data:
Object.values(map)

.sort(
(a,b)=>b.count-a.count
)

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});






app.get(
"/api/properties/stats",
(req,res)=>{


try{


const properties =
read("properties.json");



res.json({

success:true,


data:{


totalProperties:
properties.length,


forRent:
properties.filter(
x=>x.status==="For Rent"
).length,


forSale:
properties.filter(
x=>x.status==="For Sale"
).length,


totalViews:
properties.reduce(
(sum,x)=>sum+x.views,
0
),


cities:
[
...new Set(
properties.map(
x=>x.location.city
)
)
].length



}


});



}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});







app.get(
"/api/properties",
(req,res)=>{


try{


let properties =
read("properties.json");



const {

type,

status,

city,

minPrice,

maxPrice,

beds,

sort,

search


}=req.query;




if(type && type!=="all")

properties =
properties.filter(
x=>
x.type.toLowerCase()
===
type.toLowerCase()
);




if(status && status!=="all")

properties =
properties.filter(
x=>
x.status
.toLowerCase()
.includes(
status.toLowerCase()
)

);





if(city && city!=="all")

properties =
properties.filter(
x=>
x.location.city
.toLowerCase()
===
city.toLowerCase()

);





if(minPrice)

properties =
properties.filter(
x=>
x.price >= Number(minPrice)
);




if(maxPrice)

properties =
properties.filter(
x=>
x.price <= Number(maxPrice)
);




if(beds && beds!=="any")

properties =
properties.filter(
x=>
x.bedrooms >= Number(beds)
);





if(search){


const q =
search.toLowerCase();


properties =
properties.filter(
x=>

x.title
.toLowerCase()
.includes(q)

||

x.location.city
.toLowerCase()
.includes(q)

);


}




if(sort==="price_asc")

properties.sort(
(a,b)=>a.price-b.price
);



if(sort==="price_desc")

properties.sort(
(a,b)=>b.price-a.price
);



if(sort==="popular")

properties.sort(
(a,b)=>b.views-a.views
);





res.json({

success:true,

count:
properties.length,

data:
properties


});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});








app.get(
"/api/properties/:id",
(req,res)=>{


try{


const property =
read("properties.json")
.find(

p=>

p.id===req.params.id

||

p.slug===req.params.id

);



if(!property)

return res.status(404)
.json({

success:false,

message:"Not found"

});



res.json({

success:true,

data:property

});


}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});







// ===============================
// Agents
// ===============================



app.get(
"/api/agents",
(req,res)=>{


try{


res.json({

success:true,

data:
read("agents.json")

});


}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});






app.get(
"/api/agents/:id",
(req,res)=>{


try{


const agent =
read("agents.json")
.find(

a=>

a.id===req.params.id

||

a.slug===req.params.id

);



if(!agent)

return res.status(404)
.json({

success:false,

message:"Not found"

});



res.json({

success:true,


data:{


...agent,


properties:

read("properties.json")
.filter(
p=>
p.agentId===agent.id
)



}


});



}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});








// ===============================
// Inquiry
// ===============================


app.post(
"/api/inquiry",
(req,res)=>{


try{


const {

name,

email,

phone,

message,

propertyId,

agentId


}=req.body;



if(
!name ||
!email ||
!message
)

return res.status(400)
.json({

success:false,

message:
"Name,email,message required"

});





const inquiries =
read("inquiries.json");



const newInquiry={


id:
"inq-"+Date.now(),


name,


email,


phone:phone || "",


message,


propertyId:
propertyId || null,


agentId:
agentId || null,


status:
"pending",


createdAt:
new Date().toISOString()


};




inquiries.push(
newInquiry
);



fs.writeFileSync(

path.join(
DATA_DIR,
"inquiries.json"
),

JSON.stringify(
inquiries,
null,
2
)

);



res.status(201)
.json({

success:true,

message:
"Inquiry submitted!",

data:newInquiry


});


}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


});








// ===============================
// 404
// ===============================


app.use(
(req,res)=>{


res.status(404)
.json({

success:false,

message:"Route not found"

});


});







// ===============================
// SERVER
// ===============================



const server =
http.createServer(app);



server.listen(
PORT,
"0.0.0.0",
()=>{


console.log(
`
🏠 Homeverse API running

Local:
http://localhost:${PORT}

Health:
http://localhost:${PORT}/api/health

`

);


}

);
