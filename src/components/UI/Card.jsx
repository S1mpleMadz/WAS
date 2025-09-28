import "./Card.scss";
import PropTypes from "prop-types";

export function CardContainer(props) {
  return <div className="cardContainer">{props.children}</div>;
}

CardContainer.propTypes = {
  children: PropTypes.node,
};

export function Card(props) {
  return <div className="card">{props.children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
};
