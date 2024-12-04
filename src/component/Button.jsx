export default function Button(props) {
    const handleClick = () => {
        //クリックされたときに呼び出されるメソッド
        alert('Hello,' + props.name);
      }
      return (
        <button className="btn btn-primary" onClick={handleClick}>Button</button>   //HTMLの時だけ{}
      );
}