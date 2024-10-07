# Resume Builder

Resume Builder is a web application that allows users to create, edit, and export professional resumes with ease. It features a user-friendly interface, real-time preview, and an AI-powered chat assistant to help with resume writing.
Can be found here: https://resume-util.netlify.app/
This is hosted in netlify so if it becomes inactive there might be a cold restart when you try accessing it. You can wait and reload and it should work again.

## Features

- Interactive resume builder with sections for personal information, about me, education, experience, and skills
- Real-time preview of the resume as you edit
- AI-powered chat assistant for resume writing advice
- Customizable font family and font size
- Export resume to PDF
- Responsive design for use on various devices

## Technologies Used

- React.js
- Tailwind CSS
- Groq API for AI chat functionality
- html2canvas and jsPDF for PDF export

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage

1. Fill in your personal information, about me section, education, experience, and skills.
2. Use the real-time preview to see how your resume looks.
3. Click on sections in the preview to edit them directly.
4. Use the AI chat assistant for help with resume writing by clicking the "Open AI Resume Assistant" button.
5. Customize the font and scaling in the settings.
6. When you're satisfied with your resume, click the "Export" button to save it as a PDF.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
