# Local testing

use python or just click twice on index.html

```bash
python3 -m http.server --bind 127.0.0.1
```

Open http://localhost:8000 in a browser. 


# process

1. generate webpage , more foe inspiration than for real plan

    - ask chatgpt to prepare prompt and fix a little bit for my needs
        promppt:
        ```text
        A simple webpage layout designed for calculating tax based on annual revenue. The webpage has a clean and minimalistic design with the following elements: a centered header at the top that reads 'ZZP Tax Calculator,' an input field labeled 'Annual Revenue (€)' for users to enter their income, a 'Calculate Tax' button below the input field, and a section labeled 'Your Estimated Tax' to display the result. The background is wight, the text is black with a clean, sans-serif font like Arial or Helvetica, and the button is black with white text. The layout is centered with appropriate padding and spacing between elements, and a small footer at the bottom notes, 'This is a basic estimate and not financial advice.
        ```
    - try to design a webpage using (mobirise)[https://a.mobirise.com/]
        I didn't really like it as it was overcomplicated and I needed something really simmple for my first js project.
    
    - build webpage using (replot)[https://replit.com] and copilot and chatgpt