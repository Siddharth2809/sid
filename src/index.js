import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import quizService from './quizService';
import QuestionBox from './components/questionBox';
class QuizBee extends React.Component {
  state = {
    questionBank: [],
    score: 0,
    responses:0
  };
  getQuestions = () => {
    quizService().then(res => {
      console.log(res);
      this.setState( {
        questionBank: res
      });
    })
  }  
  computeAnswer = (answer, correct) => {
    if(answer == correct) {
      this.setState({score: this.state.score + 1})
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
      <div className="title">
      <h4>QuizBee</h4>
      </div>
      {this.state.questionBank.length > 0 && this.state.questionBank
      .map(({question,answers,correct,questionId })=>
        // <h4>{question}</h4>
        <QuestionBox question={question}
         options={answers} key={questionId}
         selected={ answer => this.computeAnswer(answer,correct)}></QuestionBox>
      )}
      </div>
    );
  }
}
ReactDOM.render(
  <React.StrictMode>
    <QuizBee />
   </React.StrictMode>,
  document.getElementById('root')
)
// import 'assert/style.css';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// // serviceWorker.unregister();
// serviceWorker.register();
