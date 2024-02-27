const { OpenAI } = require("openai");
const History = require("../models/history");


const openai = new OpenAI({
  apiKey: process.env.APIKEY, // This is the default and can be omitted
});

const OpenaiController = {

  GenerateQuestions: (req, res) => {
    const jobSelection = req.body.jobSelection;
    let gptInputJob = `Act as an interview coach for the ${jobSelection} role and provide the top 10 most frequently asked technical questions in this field, without any additional text. Please make sure each question ends with a '?' as you adhere to the following guidelines for providing effective questions:`;

    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptInputJob }],
    })
    .then((response) => {
      let result = response.data.choices[0].message.content.split("?");
      res.status(201).json({ message: "OK", questions: result})
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    })
  },

  GenerateFeedback: (req, res) => {
    const questions = req.body.questions;
    const answers = req.body.answers;
    const jobSelection = req.body.jobSelection;

    let answersForGPT =
    `Act as an interviewer for a ${jobSelection} role and provide actionable feedback to the candidate based on the answers to the following questions. Your feedback is crucial in helping the candidate understand their strengths and areas for improvement. Please adhere to the following guidelines for providing effective feedback:

    Keep your responses focused on the feedback itself, without including any additional text.
    Encourage the candidate to provide detailed answers beyond simple yes/no responses.
    Tailor your feedback directly to the candidate, keeping in mind that it should be constructive and supportive.
    Start each feedback with "Feedback" followed by the question number and a colon.
    Provide specific and clear feedback that highlights the candidate's areas where they can improve.
    Ensure that your feedback is actionable, offering suggestions or recommendations for enhancing their performance.` +
    `\nQuestion 1: ${questions[0]} Answer: ${answers[0]}` +
    `\nQuestion 2: ${questions[1]} Answer: ${answers[1]}` +
    `\nQuestion 3: ${questions[2]} Answer: ${answers[2]}` +
    `\nQuestion 4: ${questions[3]} Answer: ${answers[3]}` +
    `\nQuestion 5: ${questions[4]} Answer: ${answers[4]}` +
    `\nQuestion 6: ${questions[5]} Answer: ${answers[5]}` +
    `\nQuestion 7: ${questions[6]} Answer: ${answers[6]}` +
    `\nQuestion 8: ${questions[7]} Answer: ${answers[7]}` +
    `\nQuestion 9: ${questions[8]} Answer: ${answers[8]}` +
    `\nQuestion 10: ${questions[9]} Answer: ${answers[9]}`; 

    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: answersForGPT }]
    })
    .then((response) => {
      let result = response.data.choices[0].message.content;
      res.status(201).json({ message: "OK", feedback: result})
    })
    .catch((error) => {
      console.error(error.response.data);
      res.status(500).json({ message: "Internal Server Error" });
    })
  },

  GenerateCoverLetter: (req, res) => {
    const jobPosition = req.body.jobPosition
    const companyName = req.body.companyName
    const reasons = req.body.reasons
    const skills = req.body.skills
    const resume = req.body.resume
    
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `Act as a professional career advisor and help me write a tailored cover letter for the ${jobPosition} position at ${companyName}. The cover letter should reflect my motivation to apply for the role and highlight my qualifications, skills, and experiences. It should demonstrate professionalism and personality to increase my chances of getting hired. Please generate a cover letter that feels authentic and not like it was generated by ChatGPT and it has to be within 750 characters long. Use all the information about the company you can acquire and try to match them with the points in my cv. Use also the following information:
            Motivation: ${reasons}, Resume: ${resume}, Skills: ${skills}`
          }]
      })
      .then((response) => {
        let result = response.data.choices[0].message.content;
        res.status(201).json({ message: "OK", coverLetter: result});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      })
  },
  
  GenerateResignationLetter: (req, res) => {
    const jobPosition = req.body.jobPosition
    const companyName = req.body.companyName
    const reasons = req.body.reasons
    const lasting = req.body.lasting
    
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `Act as a professional career advisor and help me write a tailored resignation letter for the ${jobPosition} position at ${companyName} and make my last time at the office to be ${lasting}. The resignation letter should reflect this motivation "${reasons}" to quit the role. It should demonstrate professionalism, personality and sincerity. Please generate a resignation letter that feels authentic and not like it was generated by ChatGPT and it has to be within 750 characters long. Use all the information about the company you can acquire.`
          }]
      })
      .then((response) => {
        let result = response.data.choices[0].message.content;
        res.status(201).json({ message: "OK", resignationLetter: result});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      })
  },
  
  GenerateAudioInterview: (req, res) => {
    const jobPosition = req.body.jobPosition
    const companyName = req.body.companyName
    
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `Act as an Interviewer, provide only ten structured interview questions for assessing a candidate applying for ${jobPosition} at ${companyName}. Ensure the questions cover key competencies and skills required for success in the role. Consider including inquiries about the candidate's experience, problem-solving abilities, teamwork, and any industry-specific knowledge relevant to the position. Aim for a diverse set of questions that provide a comprehensive evaluation of the candidate's qualifications.                                                                                                                                                            
                      PROVIDE ONLY THE QUESTIONS`
          }]
      })
      .then((response) => {
        let data = response.data.choices[0].message.content;
        let stringWithoutNewlines = data.replace(/\n\n/g, "");

        let qnArray = stringWithoutNewlines.split("\n");
        res.status(201).json({ message: "OK", audioInterview: qnArray});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      })
  },
  
  GenerateAudioRating: (req, res) => {
    if (!req.body.question2) {
      return res.status(404).json({ msg: "Something went wrong!" });
    }
    const obj = [
      {
        question: req.body.question1.question,
        answer: req.body.question1.answer,
      },
      {
        question: req.body.question2.question,
        answer: req.body.question2.answer,
      },
      {
        question: req.body.question3.question,
        answer: req.body.question3.answer,
      },
      {
        question: req.body.question4.question,
        answer: req.body.question4.answer,
      },
      {
        question: req.body.question5.question,
        answer: req.body.question5.answer,
      },
      {
        question: req.body.question5.question,
        answer: req.body.question5.answer,
      },
      {
        question: req.body.question6.question,
        answer: req.body.question6.answer,
      },
      {
        question: req.body.question7.question,
        answer: req.body.question7.answer,
      },
      {
        question: req.body.question8.question,
        answer: req.body.question8.answer,
      },
      {
        question: req.body.question9.question,
        answer: req.body.question9.answer,
      },
      {
        question: req.body.question10.question,
        answer: req.body.question10.answer,
      }
    ];
  
    let objStr = JSON.stringify(obj);
    
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `Act as an Interviewer, read the following array of objects and provide the final score of the the ten answers to the ten questions on a scale of one to ten. 
	
              ${objStr} 
            
              Level of the question is hard so the response should be also based on that level
          
              Provide the response in this format : [
                  score: {the score},
                  feedback : {the feedback},
                  extra : {extra information},
                  error : {error if any}
              ]`
          }]
      })
      .then((response) => {
        let result = response.data.choices[0].message.content;
        const history = new History({
          body: result,
          userID: req.body.id,
          type: 'Audio Interview',
          date: Date(),
        });
        history.save();
        res.status(201).json({ message: "OK", audioRating: result});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      })
  },

  GenerateResumeAnalysis: (req, res) => {
    const jobPosition = req.body.jobPosition
    const resume = req.body.resume
    
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `You are an Technical Human Resource Manager with expertise in ${jobPosition}, 
            your role is to scrutinize the resume "${resume}" in light of the ${jobPosition} job position. 
            Share your insights on the candidate's suitability for the role from an HR perspective by providing a score from one to ten.
            Additionally, offer advice on enhancing the candidate's skills and identify areas where improvement is needed.
            `
          }]
      })
      .then((response) => {
        let result = response.data.choices[0].message.content;
        const history = new History({
          body: result,
          userID: req.body.id,
          type: 'Resume Analysis',
          date: Date(),
        });
        history.save();
        res.status(201).json({ message: "OK", resumeAnalysis: result});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      })
  },

};

module.exports = OpenaiController;

