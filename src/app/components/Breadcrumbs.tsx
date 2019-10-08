import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumb: {
      display: "none"
    }
  })
);

const Breadcrumbs = ({
  items
}: {
  items: { path?: string; title: string }[];
}) => {
  const classes = useStyles({});

  return (
    <>
      <ol
        className={classes.breadcrumb}
        vocab="https://schema.org/"
        typeof="BreadcrumbList"
      >
        <li property="itemListElement" typeof="ListItem">
          <a property="item" typeof="WebPage" href={`https://hero35.com/`}>
            <span property="name">React</span>
          </a>
          <meta property="position" content="1" />
        </li>
        {items.map((item, index) => (
          <li key={index} property="itemListElement" typeof="ListItem">
            {item.path ? (
              <a
                property="item"
                typeof="WebPage"
                href={`https://hero35.com/${item.path}`}
              >
                <span property="name">{item.title}</span>
              </a>
            ) : (
              <span property="name">{item.title}</span>
            )}
            <meta property="position" content={`${index + 1}`} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default Breadcrumbs;
