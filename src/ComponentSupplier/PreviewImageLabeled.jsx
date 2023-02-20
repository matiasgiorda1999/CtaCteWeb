import Container from "./DivisionContainers/Container";
import Label from "./Labels/Label";

const PreviewImageLabeled = ({ label, name, url }) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-3">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-3">
        <Container className={url ? "" : "form-control"}>
          <img
            alt=""
            src={url.toString()}
            className={url ? "form-control" : ""}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default PreviewImageLabeled;
