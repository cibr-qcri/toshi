import { Typography } from '@material-ui/core';
import React from 'react';

// Styles
import { useStyles } from './Terms-styles';

const Terms = () => {
  const classes = useStyles();
  const view = (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title} color="primary">
        Terms of Service
      </Typography>
      <Typography variant="h5" color="primary">
        Welcome to Toshi
      </Typography>
      <p>
        In order to use Toshi website, database and API (together the
        “Services”) , you should submit information such as public keys,
        transactions and other materials (together the “Content”), by uploading
        it onto Toshi, you are granting Toshi a license to use, copy, reproduce,
        process, transmit, host and display that Content for the purpose of (i)
        providing you the Toshi's services and associated support; and (ii)
        analyzing and improving the operation of the Services. Under no
        circumstances will Toshi be liable in any way for any Toshi's content,
        including, but not limited to, for any errors or omissions in any
        content, or for any loss or damage of any kind incurred as a result of
        the use of the Service. You agree that you must evaluate, and bear all
        risks associated with, the use of the Services, including any reliance
        on the accuracy, completeness, or usefulness of such content. You
        acknowledge and expressly consent to Toshi accessing, preserving, and
        disclosing account information if required to do so by law or in the
        good faith belief that such access, preservation or disclosure is
        reasonably necessary to: (a) comply with legal process; (b) enforce the
        terms; (c) respond to claims that any Toshi content violates the rights
        of third-parties; (d) protect the rights, property, or personal safety
        of Toshi, its users and the public.
      </p>
      <Typography variant="h5" color="primary">
        Using our Service
      </Typography>
      <p>
        By using our Services as a free user or a paid customer you will not,
        and will not permit anyone else to rent, lease, or sublicense your
        access to the Toshi to another person or third-party for free of for a
        fee. Nevertheless Customer of the Standard license will be granted to
        integrate information provided by the Service in any document, report,
        analysis for the purpose of its missions for its own customers. Customer
        will also be able to transfer information provided by the Service to
        comply with legal processes an/or if asked by legal authorities. Our
        free offers are reserved to private users using our Services for private
        purposes only. Any professional usage of Our Services must be agreed
        with Toshi and/or by subscribing to a Toshi license.
      </p>
      <Typography variant="h5" color="primary">
        Privacy Policy
      </Typography>
      <p>
        Toshi collects information from the Blockchain and from public websites.
        Toshi only collects public information and uses proprietary and public
        programs to aggregate the data. Toshi uses various technologies to
        collect information, and this may include sending cookies to your
        computer or mobile device. Cookies are stored on your hard drive or in
        device memory. Cookies may identify your web browser, IP address,
        location, language, time and website pages you are visiting. Such data
        may be used to analyse trends and track visitors behaviours. This data
        collected in cookies is analysed anonymously. You may want to disable
        all or certain cookies on your computer by editing parameters in your
        web browser. Please note if you do so, this may impact our website
        performance during your visit. We will collect and use personal
        information solely for fulfilling those purposes specified by us and for
        other ancillary purposes, unless we obtain the consent of the individual
        concerned or as required by law. Personal data should be relevant to the
        purposes for which it is to be used, and, to the extent necessary for
        those purposes, should be accurate, complete, and up-to-date. When you
        contact us using our contact forms, we may collect your name, email
        address, phone number, your company name. We use this information to
        answer your query. We may also use your details to send you several
        email to follow-up with you and satisfy your request. Records are kept
        for 3 years after the last contact with you. Toshi takes reasonable
        measures to help protect information about you from loss, theft, misuse
        and unauthorized access, disclosure, alteration and destruction.
      </p>
      <Typography variant="h5" color="primary">
        Privacy Questions
      </Typography>
      <p>
        If you still have questions or you want to complain about how we collect
        and process your personal data. Please send us an email at
        yboshmaf@hbku.edu.qa
      </p>
      <Typography variant="h5" color="primary">
        About Software in our Services
      </Typography>
      <p>
        Toshi will use industry standard technical and organizational security
        measures in connection with the storage, processing and transfer of the
        Content that are designed to protect the integrity of that Content and
        to guard against unauthorized or unlawful access to, use of, or
        processing of such Content.
      </p>
      <Typography variant="h5" color="primary">
        Warranties and Disclaimers
      </Typography>
      <p>
        IN NO EVENT WILL TOSHI (INCLUDING OUR DIRECTORS, MEMBERS, EMPLOYEES AND
        AGENTS) BE LIABLE TO YOU FOR ANY LOST PROFITS, LOST SAVINGS OR
        INCIDENTAL, INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF
        YOUR USE OR INABILITY TO USE TOSHI'S SERVICES OR THE BREACH OF THIS
        AGREEMENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME
        STATES DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR
        INCIDENTAL OR CONSEQUENTIAL DAMAGES SO THE ABOVE LIMITATION OR EXCLUSION
        MAY NOT APPLY TO YOU.
      </p>
    </div>
  );

  return view;
};

export default Terms;
