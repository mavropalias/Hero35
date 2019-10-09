import Layout from "../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    logo: {
      marginBottom: theme.spacing(3),
      width: "80%"
    }
  })
);

const PrivacyPolicy = () => {
  const classes = useStyles({});

  return (
    <Layout title="Privacy policy">
      <Container className={classes.container}>
        <Typography variant="h2" component="h1" paragraph>
          Privacy Policy
        </Typography>
        <Typography paragraph>Effective date: October 09, 2019</Typography>
        <Typography paragraph>
          Heroes ("us", "we", or "our") operates the https://hero35.com website
          (the "Service").
        </Typography>
        <Typography paragraph>
          This page informs you of our policies regarding the collection, use,
          and disclosure of personal data when you use our Service and the
          choices you have associated with that data.
        </Typography>
        <Typography paragraph>
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Information Collection And Use
        </Typography>
        <Typography paragraph>
          We collect several different types of information for various purposes
          to provide and improve our Service to you.
        </Typography>
        <Typography variant="h4" component="h3" paragraph>
          Types of Data Collected
        </Typography>
        <Typography variant="h5" component="h4" paragraph>
          Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you ("Personal Data"). Personally identifiable information
          may include, but is not limited to:
        </Typography>
        <Typography variant="body1" paragraph>
          Email address, First name and last name, Cookies and Usage Data.
        </Typography>
        <Typography variant="h5" component="h4" paragraph>
          Usage Data
        </Typography>
        <Typography variant="body1" paragraph>
          We may also collect information how the Service is accessed and used
          ("Usage Data"). This Usage Data may include information such as your
          computer's Internet Protocol address (e.g. IP address), browser type,
          browser version, the pages of our Service that you visit, the time and
          date of your visit, the time spent on those pages, unique device
          identifiers and other diagnostic data.
        </Typography>
        <Typography variant="h5" component="h4" paragraph>
          Tracking & Cookies Data
        </Typography>
        <Typography paragraph>
          We use cookies and similar tracking technologies to track the activity
          on our Service and hold certain information.
        </Typography>
        <Typography paragraph>
          Cookies are files with small amount of data which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          website and stored on your device. Tracking technologies also used are
          beacons, tags, and scripts to collect and track information and to
          improve and analyze our Service.
        </Typography>
        <Typography paragraph>
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our Service.
        </Typography>
        <Typography variant="h5" component="h4" paragraph>
          Examples of Cookies we use:
        </Typography>
        <Typography paragraph>
          Session Cookies. We use Session Cookies to operate our Service.
          Preference Cookies. We use Preference Cookies to remember your
          preferences and various settings. Security Cookies. We use Security
          Cookies for security purposes.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Use of Data
        </Typography>
        <Typography variant="body1" paragraph>
          Heroes uses the collected data for various purposes:
        </Typography>
        <Typography variant="body1" paragraph>
          To provide and maintain the Service. To notify you about changes to
          our Service. To allow you to participate in interactive features of
          our Service when you choose to do so. To provide customer care and
          support . To provide analysis or valuable information so that we can
          improve the Service. To monitor the usage of the Service. To detect,
          prevent and address technical issues.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Transfer Of Data
        </Typography>
        <Typography variant="body1" paragraph>
          Your information, including Personal Data, may be transferred to — and
          maintained on — computers located outside of your state, province,
          country or other governmental jurisdiction where the data protection
          laws may differ than those from your jurisdiction.
        </Typography>
        <Typography variant="body1" paragraph>
          If you are located outside Ireland and choose to provide information
          to us, please note that we transfer the data, including Personal Data,
          to Ireland and process it there.
        </Typography>
        <Typography variant="body1" paragraph>
          If you are located outside USA and choose to provide information to
          us, please note that we transfer the data, including Personal Data, to
          the USA and process it there.
        </Typography>
        <Typography variant="body1" paragraph>
          Your consent to this Privacy Policy followed by your submission of
          such information represents your agreement to that transfer.
        </Typography>
        <Typography variant="body1" paragraph>
          Heroes will take all steps reasonably necessary to ensure that your
          data is treated securely and in accordance with this Privacy Policy
          and no transfer of your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of your data and other personal information.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Disclosure Of Data
        </Typography>
        <Typography variant="h4" component="h3" paragraph>
          Legal Requirements
        </Typography>
        <Typography variant="body1" paragraph>
          Heroes may disclose your Personal Data in the good faith belief that
          such action is necessary to:
        </Typography>
        <Typography variant="body1" paragraph>
          To comply with a legal obligation. To protect and defend the rights or
          property of Heroes. To prevent or investigate possible wrongdoing in
          connection with the Service. To protect the personal safety of users
          of the Service or the public. To protect against legal liability.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Security Of Data
        </Typography>
        <Typography variant="body1" paragraph>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your Personal Data, we cannot guarantee its absolute
          security.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Service Providers
        </Typography>
        <Typography variant="body1" paragraph>
          We may employ third party companies and individuals to facilitate our
          Service ("Service Providers"), to provide the Service on our behalf,
          to perform Service-related services or to assist us in analyzing how
          our Service is used.
        </Typography>
        <Typography variant="body1" paragraph>
          These third parties have access to your Personal Data only to perform
          these tasks on our behalf and are obligated not to disclose or use it
          for any other purpose.
        </Typography>
        <Typography variant="h4" component="h3" paragraph>
          Analytics
        </Typography>
        <Typography variant="body1" paragraph>
          We may use third-party Service Providers to monitor and analyze the
          use of our Service.
        </Typography>
        <Typography variant="h5" component="h4" paragraph>
          Google Analytics
        </Typography>
        <Typography variant="body1" paragraph>
          Google Analytics is a web traffic analysis tool. You can read the
          Privacy Policy for Google Analytics here:
          https://policies.google.com/technologies/partner-sites
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Links To Other Sites
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service may contain links to other sites that are not operated by
          us. If you click on a third party link, you will be directed to that
          third party's site. We strongly advise you to review the Privacy
          Policy of every site you visit.
        </Typography>
        <Typography variant="body1" paragraph>
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service does not address anyone under the age of 13 ("Children").
        </Typography>
        <Typography variant="body1" paragraph>
          We do not knowingly collect personally identifiable information from
          anyone under the age of 13. If you are a parent or guardian and you
          are aware that your Children has provided us with Personal Data,
          please contact us. If we become aware that we have collected Personal
          Data from children without verification of parental consent, we take
          steps to remove that information from our servers.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Changes To This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Typography>
        <Typography variant="body1" paragraph>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us
          by email: info@hero35.com.
        </Typography>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
