export default{
    firstName:'John',
    lastName:'Williams',
    jobTitle:'Software Engineer',
    address:'XYZ Toronto, Canada',
    phone:'(987)-654-3210',
    email:'example@gmail.com',
    theme:'#ff6666',
    summary:'A skilled software engineer specializing in designing, developing, and optimizing scalable applications and passionate about problem-solving, innovation, and leveraging technology to create impactful solutions.',
    experience:[
        {
            id:1,
            workTitle:'Front End Developer',
            company:'Microsoft',
            city:'Bangalore',
            startDate:'Dec 24',
            endDate:'',
            currentlyWorking:true,
            workSummary:'Developed responsive and visually appealing user interfaces using HTML, CSS, and JavaScript frameworks (e.g., React, Vue, Angular) to enhance user experience.\n'+'Connected front-end components with backend APIs, ensured seamless performance, and optimized website speed, accessibility, and responsiveness.\n'+'Identified and fixed UI/UX bugs, updated features, and ensured cross-browser compatibility for a smooth and consistent user experience.',
        }
    ],
    education:[
        {
            id:1,
            universityName:'Delhi Technical University',
            state:'New Delhi',
            startDate:'Aug 2020',
            endDate:'Jun 2024',
            degree:'Bachelors',
            major:'Electrical',
        }
    ],
    skill:[
        {
            id:1,
            name:'C++',
            rating:2.5
        },
        {
            id:2,
            name:'JavaScript',
            rating:4.5

        }
    ],
    project:[
        {
            id:1,
            projectName:'E-Commerce Website',
            techUsed:'NextJs, Mongo DB, Tailwind CSS',
            projectSummary:'Developed a full-stack e-commerce website using Next.js for a seamless, server-rendered user experience, MongoDB for efficient data storage, and Tailwind CSS for a modern, responsive UI.\n'+'Implemented API routes for dynamic data handling, SSR/ISR for improved SEO and load times, and state management for smooth navigation.\n'
        }
    ]
}