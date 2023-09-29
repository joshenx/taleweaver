<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joshenx/taleweaver">
    <img style="margin: 2rem" src="/frontend/src/images/taleweaver_logo_svg.svg" alt="TaleWeaver Logo" width="300" height="100">
  </a>

  <p align="center">
    Millions of Customisable, Safe Storybooks
    <br />
    <br />
    <a href="https://taleweaver.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/joshenx/taleweaver/issues">Report Bug</a>
    ·
    <a href="https://github.com/joshenx/taleweaver/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Are you a time-strapped working parent struggling to find quality storytime for your child? Say goodbye to the frustration of repetitive bedtime tales and the endless quest for the right book. TaleWeaver offers a convenient and time-efficient means for parents to provide personalised storytelling experiences through the use of Language Models (LLMs) for rapid story generation. This not only alleviates the frustration of repetitive and hard-to-find books but also fosters engagement through the child's inclusion as the main character. It stands out as a superior alternative to mindless screen time, encouraging children to explore imaginative worlds through personalised stories and illustrations while also enabling parents to instil moral values, ensuring that the time children spend with TaleWeaver is not just entertaining but also enriching.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contributions

Joshen Lim - A0214525M

- Branding of TaleWeaver
- Frontend development of landing page, assets, UI, book display
- Development of authentication and authentication provider

Neo Wei Qing - A0217395X

- Implement backend and storage in Flask
- Integrate frontend with backend servers
- Frontend development of library

Jivesh Mohan - A0221768Y

- Development of authentication
- Improvement of signup validation
- Implement Google analytics
- Frontend development of authentication provider

Lau Zhan Ming - A0236552E

- Prompt refinement, prompt engineering
- Frontend development of libraries
- Integration frontend with backend servers
- Full stack development of libraries

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Chakra UI][Chakra-ui]][Chakra-url]
- [![Flask][Flask]][Flask-url]
- [![OpenAI][OpenAI]][Flask-url]
- [![Supabase][Supabase-icon]][Supabase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services. All three processes (frontend, backend, storage) should be running at the same time._

1. Clone the repo
   ```sh
   git clone https://github.com/joshenx/taleweaver.git
   ```
2. Setup frontend on localhost:5173
   ```sh
   cd taleweaver/frontend
   yarn install
   yarn start
   ```
3. Setup backend on localhost:8000 (default)
   ```sh
   cd taleweaver/genapi
   pip install -r requirements.txt
   uvicorn src.main:app --reload
   ```
4. Setup storage on localhost:8080 (default)
   ```sh
   cd taleweaver/storage
   pip install -r requirements.txt
   uvicorn src.main:app --port 8080 --reload
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add main features
- [x] Add readme
- [ ] Improve image generation
- [ ] Make stories sharable

See the [open issues](https://github.com/joshenx/taleweaver/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [ChatGPT](https://chat.openai.com/)
- [Authentication in React with Supabase](https://blog.openreplay.com/authentication-in-react-with-supabase/)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Chakra-ui]: https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge
[Chakra-url]: https://chakra-ui.com/
[Flask]: https://shields.io/badge/Flask-black?logo=flask&style=for-the-badge
[Flask-url]: https://flask.palletsprojects.com/en/2.3.x/
[Supabase-icon]: https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge
[Supabase-url]: https://supabase.com/
[OpenAI]: https://shields.io/badge/OpenAI-black?logo=openai&style=for-the-badge
[Supabase-url]: https://supabase.com/
