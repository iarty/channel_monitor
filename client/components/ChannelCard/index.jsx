import { Card } from "react-bootstrap";
import classes from "./Style.module.scss";

const ChannelCard = ({ name, status, datetime, provider, onClick }) => {
  const cls = [classes.cardInner, status ? classes.success : classes.fail];
  return (
    <Card className={classes.CardWrap} onClick={onClick}>
      <Card.Body className={cls.join(" ")}>
        <p>{name}</p>
        <p>Status: {status}</p>
        <p>{provider}</p>
        {/* <p>
          <small>{datetime}</small>
        </p> */}
      </Card.Body>
    </Card>
  );
};

export default ChannelCard;
