import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * A component to include header metada.
 * Define the props: title, description, name and type in an object to set the metadata of your page.
 *
 * example template:
 *
 * \<SEO title="Linkyo | Landing Page" description="Reach out to more people. 10x your growth." name="Linkyo" type="website" /\>
 * @param {*} param0 {title?, description?, name?, type?}
 * @returns
 */
export default function SEO({ title, description, name, type }) {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* End standard metadata tags */}
            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {/* End Facebook tags */}
            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {/* End Twitter tags */}
        </Helmet>
    );
}
