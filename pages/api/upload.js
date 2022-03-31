
/*It’s a cool feature because thanks to it, you can build a hybrid application containing both server-rendered and statically generated pages.

Next JS is a perfect choice when SSR becomes more important than SSG.
In other words, use Next if:
Content is being frequently updated or needs to be always up-to-date
You have a large, multi-user site like TikTok (which requires real-time publishing)
On top of that, Next.js became one of the most famous frameworks to build super fast and SEO-efficien 

Benefits of using Next.js for marketing ;
Next JS is perfect for that because websites and applications created with Next JS are superfast.
And you should already know that page load speed is one of the key SEO ranking factors. 
In other words, the faster the page is the bigger chances of ranking higher than slower sites.

Benefits of using Next.js for development ;The most important thing that developers love is reusable components,
Built-in CSS support – possibility to import CSS files from a JavaScript file */



import {IncomingForm} from "Formidable";   
const fs = require("fs");
import userDataProvider from '../../provider/userDataProvider';

export const config = {
  api: {
    bodyParser: false
  }
};

//API Routes let you create an API endpoint inside a Next.js app. 
//A Good Use Case: Handling Form Input
//A good use case for API Routes is handling form input. 
//For example, you can create a form on your page and have it send a POST request to your API Route.
//You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });
        
        try {
            const userNmae = data.fields.name;
            const userId = data.fields.id;
            const imageFile = data.files.image; 

            const imagePath = imageFile.filepath;
            
            const pathToWriteImage = `public/images/usersImages/${userNmae}-${imageFile.originalFilename}`; // include name and .extention, you can get the name from data.files.image object
           
            const image = await fs.readFileSync(imagePath,(err) => { 
                if (err) {                     
                  console.log(err); 
                } 
              });
            
            await fs.writeFileSync(pathToWriteImage, image, (err) => { 
                if (err) { 
                  console.log(err); 
                } 
              });
            //store path in DB
            const user = userDataProvider.update(userId, { imgUrl: pathToWriteImage });
            
            res.status(200).json({ message: 'image uploaded!'});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: error.message });
            return;
        }
        
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) });
  }
}



/*If your app is a plain React.js app (without Next.js), there’s no pre-rendering, so you won’t be able to see the app if you disable JavaScript. For example:
* Enable JavaScript in your browser and check out this page. This is a plain React.js app built with Create React App.
* Now, disable JavaScript and access the same page again.
* You won’t see the app anymore — instead, it’ll say “You need to enable JavaScript to run this app.” This is because the app is not pre-rendered into static HTML.


Two Forms of Pre-rendering;;
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.
* Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
* Server-side Rendering is the pre-rendering method that generates the HTML on each request.

In development mode (when you run npm run dev or yarn dev), every page is pre-rendered on each request — even for pages that use Static Generation.

When to Use Static Generation v.s. Server-side Rendering ::
We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, 
which makes it much faster than having a server render the page on every request.
You can use Static Generation (getStaticProps) for many types of pages, including:

* Marketing pages
* Blog posts
* E-commerce product listings
* Help and documentation

If this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.
On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request.
 Maybe your page shows frequently updated data, and the page content changes on every request.
 In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. 
 Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.


SWR
The team behind Next.js has created a React hook for data fetching called SWR. 
We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
 ====================================================
Trying to solve the whole problem in one shot can lead to headaches and other problems down the road. 
Make your life easier by divvying it up into smaller tasks. Over time things will become more orderly and finally begin to straighten themselves out. 
This also helps you fine-tune your code to prevent new bugs from arising in the future.

Development vs. Production
* In development (npm run dev or yarn dev), getStaticPaths runs on every request.
* In production, getStaticPaths runs at build time.*/






