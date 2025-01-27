import "./css/form-input.css";
import { useState, useEffect } from "react";
import Username from "./form/input/username";
import Name from "./form/input/name";
import FullName from "./form/input/fullName";
import Address from "./form/input/address";
import Email from "./form/input/email";
import Password from "./form/input/password";
import Contact from "./form/input/contact";
import UsageConsentCheck from "./form/input/usageConsentCheck";
import Google from "./form/input/google/index.jsx";

export default function FormInput(props) {
    const [componentType, setComponentType] = useState();
    const [componentValue, setComponentValue] = useState();
    const [componentIdPrefix, setComponentIdPrefix] = useState();
    const [componentRef, setComponentRef] = useState();

    useEffect(() => {
        if (!!props.componentType === true)
            setComponentType(props.componentType);
        if (!!props.componentValue === true)
            setComponentValue(props.componentValue);
        if (!!props.componentIdPrefix === true)
            setComponentIdPrefix(props.componentIdPrefix);
        if (!!props.componentRef === true) setComponentRef(props.componentRef);
    }, [
        props.componentType,
        props.componentValue,
        props.componentIdPrefix,
        props.componentRef,
    ]);

    // Renders
    if (componentType === "username") {
        return (
            <Username
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "name") {
        return (
            <Name
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "fullName") {
        return (
            <FullName
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "address") {
        return (
            <Address
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "email") {
        return (
            <Email
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "password") {
        return (
            <Password
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "contact") {
        return (
            <Contact
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "usage-consent-check") {
        return (
            <UsageConsentCheck
                componentIdPrefix={componentIdPrefix}
                componentValue={componentValue}
                componentRef={componentRef}
            />
        );
    }

    if (componentType === "google") {
        return <Google style={props.style} />;
    }
}
