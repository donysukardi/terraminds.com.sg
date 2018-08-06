import React from "react";

const AboutLayout = ({ html, bg }) => (
	<section className="section  section--page pb0">
		<div className="wrapper-large">
			<div className="content-col">
				<div
					className="content-col__body col-3@desk col-2@lap-and-up col--large"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</div>
		<div className="img-tint" style={{ backgroundImage: `url(${bg})` }}  />
	</section>
);

export default AboutLayout;
