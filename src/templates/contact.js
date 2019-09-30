import React, { Component } from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Heading from '../components/Heading'
import Layout from "../components/Layout"

class PageTemplate extends Component {
  state = {
    submitted: false
  }

  handleSubmit = e => {
    e.preventDefault()

    const action = e.target.action
    const elements = e.target.elements
    let data = "";
    for(let i=0; i < elements.length; ++i) {
      let input = elements[i];
      if (input.type.toLowerCase() === 'submit') continue;
      data += input.name + "=" + encodeURIComponent(input.value) + "&";
    }

    this.setState({
      submitted: false
    })

    const xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.setState({
          submitted: true
        })
      }
    };
    xhr.send(data)
  }

  render() {
    const { submitted } = this.state
    const { data: { wordpressPage, allWordpressAcfOptions }, location } = this.props
    const { opening_hours: openingHours } = allWordpressAcfOptions.edges[0].node
    const currentPage = wordpressPage
    const { acf } = currentPage
    const { heading } = acf
    
    return (
      <Layout location={location}>
        <Helmet title={currentPage.title}>
        </Helmet>
        <Heading {...heading} />
        <section className="section section--page">
          <div className="wrapper">
            <ul className="layout layout--large">
              <li className="layout__item u-1/2@desk mb+">
                <h3>Contact Us</h3>
                <p id="contact-form-confirmation" className={`text-secondary contact-form-confirmation${submitted ? ' is-active' : ''}`}>
                  Thank you for contacting us. We will be in touch with you shortly.
                </p>
                <div className="contact-form">
                  <p>For registration or enquiries, please contact us by filling out the form below.</p>
                  <form id="contact-form" action="https://formcarry.com/s/dF554gn7tsJ" method="POST" accept-charset="UTF-8" onSubmit={this.handleSubmit} className="contact-form">
                    <ul className="layout">
                      <li className="layout__item u-1/2@lap-and-up mb">
                        <label className="input-text input-text--boxed  u-1/1">
                          <input type="text" placeholder="" name="name" className="input-text__input u-1/1" required />
                          <span className="input-text__label">Name</span>                                  
                        </label>
                      </li>
                      <li className="layout__item u-1/2@lap-and-up mb">
                        <label className="input-text input-text--boxed u-1/1">
                          <input type="text" placeholder="" name="phone" className="input-text__input  u-1/1" required />
                          <span className="input-text__label">Phone Number</span>
                        </label>
                      </li>
                      <li className="layout__item u-1@lap-and-up mb">
                        <label className="input-text input-text--boxed  u-1/1">
                          <input className="input-text__input u-1/1" type="email" name="email" placeholder="" required />
                          <span className="input-text__label">Email</span>
                        </label>
                      </li>
                      <li className="layout__item">
                        <label className="input-text input-text--boxed u-1/1 mb">
                          <textarea className="input-text__input  u-1/1" name="message" placeholder="" required />
                          <span className="input-text__label">Message</span>
                        </label>
                      </li>
                    </ul>
                    <input type="hidden" name="_gotcha">
                    <button className="btn" id="submit">Send</button>
                  </form>
                </div>
              </li>
              <li className="layout__item u-1/2@desk mb+">
                <h3>Terra Minds Learning Centre</h3>
          
                <p className="label mb" style={{cursor:"default"}}>We've moved from 506 Tampines Central</p>
                      
                <p>
                  11 Tampines Street 32 #02-03 Tampines Mart<br />
                  Singapore 529287
                </p>

                <p>
                  Tel: <a href="tel:+6567813688" className="link-silent">+65 6781 3688</a> / <a href="tel:+6598336282" className="link-silent">+65 9833 6282</a><br />
                  Email:  <a href="mailto:info@terraminds.com.sg" className="link-silent"> info@terraminds.com.sg</a>
                </p>
                    
                <h4>Opening Hours</h4>
                <ul className="list-table">
                  {openingHours.map((entry, idx) => (
                    <li key={idx}>
                      <span style={{fontWeight: 'bold', width: '140px'}}>{entry.day}</span>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
      template
      acf {
        heading {
          ...Heading
        }
        call_to_action {
          ...CallToAction
        }
      }
    }
    allWordpressAcfOptions{
      ...ACFOptions
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
