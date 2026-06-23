import { Link } from "react-router-dom"

import HeroPage from "../../components/Hero/HeroPage"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import Input from "../../components/ui/Input/Input"
import DatePicker from "../../components/ui/DatePicker/DatePicker"
import Select from "../../components/ui/Select/Select"
import CheckBox from "../../components/ui/CheckBox/CheckBox"
import Button from "../../components/ui/Button/Button"
import Accordion from "../../components/ui/Accordion/Accordion"

import { demoAccordionData } from "../../data/accordionData"
import { COUNTRIES } from "../../data/constants"

import "./Elements.scss"

import heroBackground from "../../assets/img/demo-background.jpg"

export default function Elements() {

    const title = "UI Elements";

    return(
        <>
             <HeroPage title={title} background={heroBackground} />
             <Breadcrumbs 
                items={[
                    {label: "Home", link: "/"},
                    {label: title},
                ]} 
             />
            <section className="section-colors pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Main colors:</h3>
                        <div className="colors-wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-headings pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Headings:</h3>
                        <div className="heading-wrapper">
                            <h1>Hading H1</h1>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                            <h2>Hading H2</h2>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                            <h3>Hading H3</h3>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                            <h4>Hading H4</h4>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                            <h5>Hading H5</h5>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                            <h6>Hading H6</h6>
                            <p>Welcome to our wonderful world. We sincerely hope that each and every user entering <a href="#">hyperlink text</a> our website will find exactly what he/she is looking for. With advanced features of activating account and new login widgets, you will definitely have a great experience of using our web page.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-lists pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Lists:</h3>
                        <div className="lists-wrapper">
                            <ul>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ul>
                            <ol>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-forms pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Forms:</h3>
                        <div className="forms-wrapper">
                            <Input type="text" className="input-demo" id="123" label="Demo input" placeholder="..." />
                            <Input disabled={true} label="Demo input disabled" placeholder="..." />
                            <Input label="Demo input error" errorMessage="Username must be between 3 and 20 characters." placeholder="..." />
                            <DatePicker label="Demo date picker" placeholder="MM/DD/YYYY" />
                            <Select items={COUNTRIES} value="" label="Demo select" />
                            <Select items={COUNTRIES} value="" disabled={true} label="Demo select disabled" />
                            <Select items={COUNTRIES} value="" label="Demo select error" errorMessage="Please select a country" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-checkboxes pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Checkboxes:</h3>
                        <div className="checkboxes-wrapper">
                            <CheckBox
                                label={<span>I agree to the <Link to="/terms-and-conditions">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</span>}
                            />
                            <CheckBox
                                label={<span>I agree to the <Link to="/terms-and-conditions">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</span>}
                                errorMessage="You must accept the terms and conditions to continue"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-buttons pt-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Buttons:</h3>
                        <div className="buttons-wrapper">
                            <Button>Primary Button</Button>
                            <Button variant="secondary">Secondary Button</Button>
                            <Button disabled>Disabled Button</Button>

                            {/* Call a button examples
                            
                            // As button
                            <Button onClick={handleAdd}>Add to cart</Button>

                            // As link
                            <Button as={Link} to="/checkout">Proceed to Checkout</Button>
                            
                            */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-accordion pt-120 pb-120">
                <div className="container">
                    <div className="section-inner">
                        <h3>Accordion:</h3>
                        <Accordion items={demoAccordionData} />
                    </div>
                </div>
            </section>
        </>
    )
}