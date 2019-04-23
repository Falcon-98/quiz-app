import React, { Component } from 'react';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu
} from 'semantic-ui-react';
import Loader from './Loader.jsx';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizData: props.quizData,
      isLoading: true,
      questionIndex: 0,
      correctAnswers: 0,
      userSlectedAns: null
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ userSlectedAns: name });
  }

  componentDidMount() {
    const { quizData, questionIndex } = this.state;
    const outPut = this.getRandomNumber();
    const options = [...quizData[questionIndex].incorrect_answers];
    options.splice(outPut, 0, quizData[questionIndex].correct_answer);

    setTimeout(() => {
      this.setState({ isLoading: false, options, outPut });
    }, 1000);
  }

  getRandomNumber() {
    const min = Math.ceil(0);
    const max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleNext() {
    const {
      userSlectedAns,
      quizData,
      questionIndex,
      correctAnswers
    } = this.state;

    let point = 0;
    if (userSlectedAns === quizData[questionIndex].correct_answer) {
      point = 1;
    }

    if (questionIndex === 9) {
      this.setState({
        correctAnswers: correctAnswers + point,
        userSlectedAns: null
      });
      return false;
    }

    const outPut = this.getRandomNumber();

    const options = [...quizData[questionIndex + 1].incorrect_answers];
    options.splice(outPut, 0, quizData[questionIndex + 1].correct_answer);
    this.setState({
      correctAnswers: correctAnswers + point,
      questionIndex: questionIndex + 1,
      userSlectedAns: null,
      options,
      outPut
    });
  }

  render() {
    const {
      quizData,
      questionIndex,
      options,
      outPut,
      userSlectedAns,
      isLoading,
      correctAnswers
    } = this.state;

    console.log(userSlectedAns);
    console.log(questionIndex, outPut);
    console.log('Score ==>', correctAnswers);

    return (
      <div>
        {isLoading && <Loader />}
        {!isLoading && (
          <Container>
            <Segment attached>
              <Item.Group divided>
                <Item>
                  <Item.Content>
                    <Item.Header>
                      <h1>Question No.{questionIndex + 1} of 10</h1>
                    </Item.Header>
                    <br />
                    <br />
                    <br />
                    <Item.Meta>
                      <Message size="huge" floating>
                        <b>{`Q. ${quizData[questionIndex].question}`}</b>
                      </Message>
                      <br />
                      <Item.Description>
                        <h3>Please choose one of the following answers:</h3>
                      </Item.Description>
                      <Divider />
                      <Menu vertical fluid size="massive">
                        {options.map((item, i) => {
                          let letter;
                          switch (i) {
                            case 0:
                              letter = 'A.';
                              break;
                            case 1:
                              letter = 'B.';
                              break;
                            case 2:
                              letter = 'C.';
                              break;
                            case 3:
                              letter = 'D.';
                              break;
                            default:
                              letter = i;
                              break;
                          }
                          return (
                            <Menu.Item
                              key={item}
                              name={item}
                              active={userSlectedAns === item}
                              onClick={this.handleItemClick}
                            >
                              <b style={{ marginRight: '8px' }}>{letter}</b>
                              {item}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    </Item.Meta>
                    <Divider />
                    <Item.Extra>
                      {!userSlectedAns && (
                        <Button primary floated="right" size="big" disabled>
                          Next
                          <Icon name="right chevron" />
                        </Button>
                      )}
                      {userSlectedAns && (
                        <Button
                          primary
                          floated="right"
                          size="big"
                          onClick={this.handleNext}
                        >
                          Next
                          <Icon name="right chevron" />
                        </Button>
                      )}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Container>
        )}
      </div>
    );
  }
}

export default Quiz;