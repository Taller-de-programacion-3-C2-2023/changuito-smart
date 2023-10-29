export default function ListItem(props) {
  const { _id: id, description: name } = props.product;
  return <ListItem id={id} name={name}></ListItem>;
}
