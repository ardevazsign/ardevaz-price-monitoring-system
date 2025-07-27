import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
// import NewsletterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-[450px]" src={assets.comp_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <h5 className="indent-25">
            ArdevazSign specialize in crafting dynamic, high-performance web
            applications that drive success. As a full-stack web developer with
            expertise in JavaScript and modern frameworks like React, I bring
            innovative solutions to life, ensuring seamless functionality from
            front-end to back-end. My passion lies in building scalable,
            user-friendly, and efficient digital experiences tailored to meet
            unique business needs. With a strong commitment to clean code,
            cutting-edge technology, and client collaboration, I strive to
            deliver impactful and future-ready solutions that help businesses
            thrive in the digital era.
          </h5>
          <h5 className="indent-25">
            As a full-stack web developer, I specialize in JavaScript and
            leverage powerful technologies to build scalable, high-performance
            web applications. My expertise includes React.js for dynamic and
            responsive front-end development, while Node.js and Express.js power
            my back-end solutions to ensure seamless API integration and
            efficient server-side operations. I use MongoDB as my database of
            choice for handling flexible and scalable data structures. To create
            modern, visually appealing, and responsive designs, I integrate
            Tailwind CSS, along with other open-source tools that enhance
            performance, security, and development efficiency. Whether it's
            building a fast, interactive user interface or developing a robust
            back-end architecture, my approach is centered around clean code,
            maintainability, and delivering the best user experience.
          </h5>
          <h4 className=" font-bold text-amber-500">Our Mission</h4>
          <h5 className="indent-25">
            At ArdevazSign, our mission is to empower business and individuals
            by developing innovation, high-performance, and user-centric web
            solutions. As a full-stack web developer with JavaScript expertise,
            I am committed to delivering seamless digital experiences that
            enhance functionality, drive engagement, and accelerate business
            growth. With a focus on cutting-edge technology, clean code, and
            scalable architecture, I ensure that every project I work on is
            efficient, secure, and tailored to meet the unique needs of my
            clients. From intuitive front-end interfaces to robust back-end
            infrastructures, I strive to create solutions that are future-proof
            and built for success. I believe in clear communication,
            transparency, and collaboration, ensuring that my clients are always
            involved in the process and confident in the final product. My goal
            is to be more than just a developer—I aim to be a trusted partner in
            your digital transformation journey. Let’s build something amazing
            together!
          </h5>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-amber-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h4 className=" font-bold text-amber-500">Quality Assurance:</h4>
          <h6 className="text-gray-600 indent-20">
            At ArdevazSign, we believe that quality is the foundation of every
            successful digital solution. Every project is built with clean,
            efficient, and scalable code, ensuring fast performance, security,
            and long-term maintainability. By utilizing best practices, modern
            frameworks, and rigorous testing, we deliver web applications that
            are reliable, bug-free, and optimized for seamless user experiences.
          </h6>
        </div>
        <div className="border border-amber-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h4 className=" font-bold text-amber-500">Convenience:</h4>
          <h6 className="text-gray-600 indent-20">
            We understand that time is valuable, which is why we make the
            development process smooth, transparent, and hassle-free. With our
            expertise in full-stack development, we handle everything—from UI/UX
            design and front-end development to back-end integration and
            database management—ensuring a one-stop solution for all your web
            development needs. Whether you need a new website, an update, or a
            custom-built web app, we provide efficient turnaround times without
            compromising quality.
          </h6>
        </div>
        <div className="border border-amber-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <h4 className=" font-bold text-amber-500">
            Exceptional Customer Service:
          </h4>
          <h6 className="text-gray-600 indent-20">
            Your satisfaction is our top priority. We believe in open
            communication, collaboration, and a client-first approach. From the
            initial consultation to project completion, we keep you informed and
            involved, ensuring that your vision is fully realized. Whether you
            need technical guidance, updates, or post-launch support, we’re
            always available to assist. Our goal is to build strong, long-term
            relationships with our clients by delivering not just solutions, but
            also trust and reliability.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default About;
