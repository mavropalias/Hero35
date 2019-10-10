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
    }
  })
);

const TermsOfService = () => {
  const classes = useStyles({});

  return (
    <Layout title="Privacy policy">
      <Container className={classes.container}>
        <Typography variant="h2" component="h1" paragraph>
          Terms of Service ("Terms")
        </Typography>
        <Typography paragraph>Effective date: October 09, 2019</Typography>
        <Typography paragraph>
          Please read these Terms of Service ("Terms", "Terms of Service")
          carefully before using the https://hero35.com website (the "Service")
          operated by Heroes ("us", "we", or "our").
        </Typography>
        <Typography paragraph>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </Typography>
        <Typography paragraph>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Limited License
        </Typography>
        <Typography paragraph>
          Heroes grants you a non-exclusive, non-transferable, revocable license
          to access and use our Website, strictly in accordance with our Legal
          Terms.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Copyrights and Trademarks
        </Typography>
        <Typography paragraph>
          Unless otherwise noted, all materials including without limitation,
          logos, brand names, images, designs, photographs, video clips and
          written and other materials that appear as part of our Website are
          copyrights, trademarks, service marks, trade dress and/or other
          intellectual property whether registered or unregistered
          ("Intellectual Property") owned, controlled or licensed by Heroes.
        </Typography>
        <Typography paragraph>
          Our Website as a whole is protected by copyright and trade dress.
          Nothing on our Website should be construed as granting, by
          implication, estoppel or otherwise, any license or right to use any
          Intellectual Property displayed or used on our Website, without the
          prior written permission of the Intellectual Property owner.
        </Typography>
        <Typography paragraph>
          Heroes enforces its intellectual property rights to the fullest extent
          of the law. The names and logos of Heroes, may not be used in any way,
          including in advertising or publicity pertaining to distribution of
          materials on our Website, without prior, written permission from
          Heroes. Heroes prohibits use of any logo of Heroes or any of its
          affiliates as part of a link to or from any Website unless Heroes
          approves such link in advance and in writing.
        </Typography>
        <Typography paragraph>
          Fair use of Heroes’s Intellectual Property requires proper
          acknowledgment. Other product and company names mentioned in our
          Website may be the Intellectual Property of their respective owners.
        </Typography>
        <Typography variant="h2" component="h1" paragraph>
          No Warranties; Exclusion of Liability; Indemnification
        </Typography>
        <Typography paragraph>
          OUR WEBSITE IS OPERATED BY Heroes ON AN "AS IS," "AS AVAILABLE" BASIS,
          WITHOUT REPRESENTATIONS OR WARRANTIES OF ANY KIND. TO THE FULLEST
          EXTENT PERMITTED BY LAW, Heroes SPECIFICALLY DISCLAIMS ALL WARRANTIES
          AND CONDITIONS OF ANY KIND, INCLUDING ALL IMPLIED WARRANTIES AND
          CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE
          AND NONINFRINGEMENT FOR OUR WEBSITE AND ANY CONTRACTS AND SERVICES YOU
          PURCHASE THROUGH IT.
        </Typography>
        <Typography paragraph>
          Heroes SHALL NOT HAVE ANY LIABILITY OR RESPONSIBILITY FOR ANY ERRORS
          OR OMISSIONS IN THE CONTENT OF OUR WEBSITE, FOR CONTRACTS OR SERVICES
          SOLD THROUGH OUR WEBSITE, FOR YOUR ACTION OR INACTION IN CONNECTION
          WITH OUR WEBSITE OR FOR ANY DAMAGE TO YOUR COMPUTER OR DATA OR ANY
          OTHER DAMAGE YOU MAY INCUR IN CONNECTION WITH OUR WEBSITE.
        </Typography>
        <Typography paragraph>
          YOUR USE OF OUR WEBSITE AND ANY CONTRACTS OR SERVICES ARE AT YOUR OWN
          RISK. IN NO EVENT SHALL EITHER Heroes OR THEIR AGENTS BE LIABLE FOR
          ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL
          DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OUR
          WEBSITE, CONTRACTS AND SERVICES PURCHASED THROUGH OUR WEBSITE, THE
          DELAY OR INABILITY TO USE OUR WEBSITE OR OTHERWISE ARISING IN
          CONNECTION WITH OUR WEBSITE, CONTRACTS OR RELATED SERVICES, WHETHER
          BASED ON CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF
          ADVISED OF THE POSSIBILITY OF ANY SUCH DAMAGES.
        </Typography>
        <Typography paragraph>
          IN NO EVENT SHALL Heroes’ LIABILITY FOR ANY DAMAGE CLAIM EXCEED THE
          AMOUNT PAID BY YOU TO Heroes FOR THE TRANSACTION GIVING RISE TO SUCH
          DAMAGE CLAIM.
        </Typography>
        <Typography paragraph>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE EXCLUSION MAY NOT
          APPLY TO YOU.
        </Typography>
        <Typography paragraph>
          WITHOUT LIMITING THE FOREGOING, Heroes DO NOT REPRESENT OR WARRANT
          THAT THE INFORMATION ON THE WEBITE IS ACCURATE, COMPLETE, RELIABLE,
          USEFUL, TIMELY OR CURRENT OR THAT OUR WEBSITE WILL OPERATE WITHOUT
          INTERRUPTION OR ERROR.
        </Typography>
        <Typography paragraph>
          YOU AGREE THAT ALL TIMES, YOU WILL LOOK TO ATTORNEYS FROM WHOM YOU
          PURCHASE SERVICES FOR ANY CLAIMS OF ANY NATURE, INCLUDING LOSS,
          DAMAGE, OR WARRANTY. Heroes AND THEIR RESPECTIVE AFFILIATES MAKE NO
          REPRESENTATION OR GUARANTEES ABOUT ANY CONTRACTS AND SERVICES OFFERED
          THROUGH OUR WEBSITE.
        </Typography>
        <Typography paragraph>
          Heroes MAKES NO REPRESENTATION THAT CONTENT PROVIDED ON OUR WEBSITE,
          CONTRACTS, OR RELATED SERVICES ARE APPLICABLE OR APPROPRIATE FOR USE
          IN ALL JURISDICTIONS.
        </Typography>
        <Typography variant="h2" component="h1" paragraph>
          Indemnification
        </Typography>
        <Typography paragraph>
          You agree to defend, indemnify and hold Heroes harmless from and
          against any and all claims, damages, costs and expenses, including
          attorneys' fees, arising from or related to your use of our Website or
          any Contracts or Services you purchase through it.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Accounts
        </Typography>
        <Typography paragraph>
          When you create an account with us, you must provide us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our Service.
        </Typography>
        <Typography paragraph>
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password, whether your password is with our Service or a third-party
          service.
        </Typography>
        <Typography paragraph>
          You agree not to disclose your password to any third party. You must
          notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Links To Other Web Sites
        </Typography>
        <Typography paragraph>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by Heroes.
        </Typography>
        <Typography paragraph>
          Heroes has no control over, and assumes no responsibility for, the
          content, privacy policies, or practices of any third party web sites
          or services. You further acknowledge and agree that Heroes shall not
          be responsible or liable, directly or indirectly, for any damage or
          loss caused or alleged to be caused by or in connection with use of or
          reliance on any such content, goods or services available on or
          through any such web sites or services.
        </Typography>
        <Typography paragraph>
          We strongly advise you to read the terms and conditions and privacy
          policies of any third-party web sites or services that you visit.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Termination
        </Typography>
        <Typography paragraph>
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </Typography>
        <Typography paragraph>
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
        </Typography>
        <Typography paragraph>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </Typography>
        <Typography paragraph>
          Upon termination, your right to use the Service will immediately
          cease. If you wish to terminate your account, you may simply
          discontinue using the Service.
        </Typography>
        <Typography paragraph>
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Governing Law
        </Typography>
        <Typography paragraph>
          These Terms shall be governed and construed in accordance with the
          laws of Ireland, without regard to its conflict of law provisions.
        </Typography>
        <Typography paragraph>
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service, and
          supersede and replace any prior agreements we might have between us
          regarding the Service.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Changes
        </Typography>
        <Typography paragraph>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 15 days notice, in this page, prior to any new terms
          taking effect. What constitutes a material change will be determined
          at our sole discretion.
        </Typography>
        <Typography paragraph>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the Service.
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Contact us
        </Typography>
        <Typography paragraph>
          If you have any questions about these Terms, please contact us at
          info@hero35.com.
        </Typography>
      </Container>
    </Layout>
  );
};

export default TermsOfService;
