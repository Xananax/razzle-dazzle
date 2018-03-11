/**
 * This is a component that represents a Page.
 * It uses the Helmet-React library to change
 * the title of the page
 *
 * The page is just an <h1> with the title, and
 * The `children` inserted in the div of class
 * `.Page-Content`
 *
 * In React, `children` is anything that gets passed
 * inside the component. So, if I use the
 * Page component like so:
 *
 * ```jsx
 * <Page>hello</Page>
 * ```
 * `"hello"` is the `children`
 */
import React from "react";
import Helmet from "react-helmet";
import Route from 'react-router-dom/Route';

export const Page = ({ title, children, className: c }) => (
  <div className="Page">
    <Helmet>
      <title>{title} | My Awesome Website</title>
    </Helmet>
    <div className={"Page-Body" + (c ? " " + c : "")}>
      <h1>{title}</h1>
      <div className="Page-Content">{children}</div>
    </div>
  </div>
);

export const PageWithServerStatus = ({status=200,...props}) =>
<Route render={({ staticContext }) => {
  if (staticContext){ 
    // this is needed to detect the 404 on the server
    staticContext.status = status
  }
  return <Page {...props}/>
}}/>

export default PageWithServerStatus;