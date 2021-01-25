# nextfire-material

Need to create web application with the awesome [NextJS](https://nextjs.org), [Firebase](https://firebase.google.com) and beautiful [Material UI](https://material-ui.com) without all the hassle to setup everything from scratch? Yes, this project is for you. This boilerplate codes is extracted from my own project and I thought others might need it too.

Feel free to modify it as you need in your own projects, this is not a framework which force you to follow certain convention, its just a template so you can start your project quickly.

## How to use?

You could simply download, fork or use this repository as a template and you can start your on project from there. But to make the **Firebase Authentication** works you need to update the `.env` file to match your own Firebase project configuration.

If you need to use Firebase Admin functionality, then you need to download Firebase service account JSON file from your project and put it inside root directory of this project and name the file `sa.json` (`sa` stands for Service Account, see `sa.json.sample`)

Thats all pretty much what it needed to make it work, to start the project locally you need to use `npm run dev` just like normal NextJS project.

## Demo

You can access the demo here: [https://nextfirematerial-demo.vercel.app](https://nextfirematerial-demo.vercel.app)

Feel free to navigate, create account and login. **When you create an account, it will actually create a real account on this demo, so you can try all the features especially the Account part. Once finished please delete your account from Account page**.

## License

```
MIT License

Copyright (c) 2021 Eka Putra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
