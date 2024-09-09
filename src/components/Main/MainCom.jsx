import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../../assets/assets';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Context } from '../../context/Context';

function MainCom() {
    const { onSent, showResult, setInput, input, resultData, loading, recentPrompt } = useContext(Context);
    const [copySuccess, setCopySuccess] = useState('');

    // const handleCardClick = (prompt) => {
    //     setInput(prompt);
    //     onSent();
    // };

    const handleCopy = () => {
        navigator.clipboard.writeText(resultData)
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Clear the message after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                setCopySuccess('Failed to copy');
            });
    };

    return (
        <div className="main">
            <Navbar expand="lg" className="bg-body nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </Navbar>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <Row className="card" onClick={() => onSent('Look up a Linux shell command for a specific task')}>
                                <Col xs={{ order: 'first' }}>
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '17px' }}>
                                            Look up a Linux shell command for a specific task
                                        </Card.Text>
                                        <img src={assets.code_icon} alt="Code Icon" />
                                    </Card.Body>
                                </Col>
                            </Row>

                            <Row className="card" onClick={() => onSent('Find flights and weather for an upcoming trip')}>
                                <Col xs>
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '17px' }}>
                                            Find flights and weather for an upcoming trip
                                        </Card.Text>
                                        <img src={assets.compass_icon} alt="Compass Icon" />
                                    </Card.Body>
                                </Col>
                            </Row>

                            <Row className="card" onClick={() => onSent('Help me get organized with a list of 10 tips')}>
                                <Col xs={{ order: 'last' }}>
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '17px' }}>
                                            Help me get organized with a list of 10 tips
                                        </Card.Text>
                                        <img src={assets.bulb_icon} alt="Bulb Icon" />
                                    </Card.Body>
                                </Col>
                            </Row>

                            <Row className="card" onClick={() => onSent('Explain the benefits of using React in web development')}>
                                <Col xs={{ order: 'last' }}>
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '17px' }}>
                                            Explain the benefits of using React in web development
                                        </Card.Text>
                                        <img src={assets.code_icon} alt="React Icon" />
                                    </Card.Body>
                                </Col>
                            </Row>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} className="proimg" alt="User Icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} className='proimg' alt="Gemini Icon" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <>
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    <img 
                                        src={assets.copy} 
                                        onClick={handleCopy} 
                                        className='copyimge' 
                                        alt="Copy Icon" 
                                    />
                                    {copySuccess && <span>{copySuccess}</span>}
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="send">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div className="send-icons">
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />
                        </div>
                    </div>
                    <div className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainCom;
