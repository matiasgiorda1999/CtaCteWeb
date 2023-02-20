import ButtonLabeled from "../../../ComponentSupplier/ButtonLabeled";
import Buttons from "../../../ComponentSupplier/Buttons";
import BeShowed from "../../../ComponentSupplier/BeShowed";
import BeShowedOrLoading from "../../../ComponentSupplier/BeShowedOrLoading";
import Breadcrumb from "../../../ComponentSupplier/Breadcrumb";
import SingleInputTextLabeled from "../../../ComponentSupplier/SingleInputTextLabeled";
import TitleLevel from "../../../ComponentSupplier/Titles/TitleLevel";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import SingleSelectionLabeled from "../../../ComponentSupplier/SingleSelectionLabeled";
import InputNumberLabeled from "../../../ComponentSupplier/InputNumberLabeled";
import InputImageLabeled from "../../../ComponentSupplier/InputImageLabeled";
import PreviewImageLabeled from "../../../ComponentSupplier/PreviewImageLabeled";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useObject } from "../../../Hooks/useObject";
import { useGetEntities } from "../../../Hooks/useGetEntities";
import {
  enterpriseIdentifiedBy,
  getEmptyEnterpriseForm,
  handleSubmit,
} from "./EnterpriseManagementContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PORT = require("../../../config");

const FormEnterprise = ({ title, disableOptions }) => {
  const params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const enterpriseForm = useObject(getEmptyEnterpriseForm());
  useEffect(() => {
    if (params.empresaid) {
      getAccessTokenSilently().then((accessToken) => {
        enterpriseIdentifiedBy(params.empresaid, accessToken).then(
          (enterprise) => {
            enterpriseForm.changeContentTo(enterprise);
          }
        );
      });
    }
  }, []);
  const provinces = useGetEntities(`${PORT()}/afip-provincias`);
  const countries = useGetEntities(`${PORT()}/afip-paises`);
  const responsables = useGetEntities(`${PORT()}/afip-responsables`);
  const incomes = useGetEntities(`${PORT()}/afip-ingresos-brutos`);
  if (
    provinces.content &&
    countries.content &&
    responsables.content &&
    incomes.content
  ) {
    return (
      <form
        className="container-fluid"
        onSubmit={async (event) =>
          handleSubmit(
            event,
            await getAccessTokenSilently(),
            enterpriseForm,
            params.empresaid
          )
        }
      >
        <Breadcrumb
          currentName={title}
          parentName="Empresas"
          parentLink="/empresas"
          icon={faBuilding}
        />
        <br />
        <TitleLevel level={3}>{title}</TitleLevel>
        <hr />
        <BeShowedOrLoading show={true} message="Cargando formulario">
          <SingleInputTextLabeled
            label="Nombre"
            placeholder="Ingrese el nombre de la empresa"
            minLength="1"
            maxLength="45"
            readOnly={disableOptions}
            value={enterpriseForm.content.name}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("name", target.value)
            }
            error={enterpriseForm.content.errors.name}
          />
          <InputNumberLabeled
            label="CUIT"
            placeholder="Ingrese el CUIT asociado a la empresa"
            allowDecimals={false}
            allowNegativeValue={false}
            disableGroupSeparators={true}
            readOnly={disableOptions}
            value={enterpriseForm.content.cuit}
            onValueChange={(value) =>
              enterpriseForm.changePropertyTo("cuit", value)
            }
            error={enterpriseForm.content.errors.cuit}
          />
          <Container className="row"></Container>
          <SingleInputTextLabeled
            label="Calle"
            placeholder="Ingrese la calle asociada a la empresa"
            minLength="1"
            maxLength="45"
            readOnly={disableOptions}
            value={enterpriseForm.content.street}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("street", target.value)
            }
            error={enterpriseForm.content.errors.street}
          />
          <InputNumberLabeled
            label="N° de Calle"
            placeholder="Ingrese el N° de la calle asociada a la empresa"
            allowDecimals={false}
            allowNegativeValue={false}
            readOnly={disableOptions}
            value={enterpriseForm.content.streetNumber}
            onValueChange={(value) =>
              enterpriseForm.changePropertyTo("streetNumber", value)
            }
            error={enterpriseForm.content.errors.streetNumber}
          />
          <SingleInputTextLabeled
            label="Localidad"
            placeholder="Ingrese la localidad asociada a la empresa"
            minLength="1"
            maxLength="45"
            readOnly={disableOptions}
            value={enterpriseForm.content.location}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("location", target.value)
            }
            error={enterpriseForm.content.errors.location}
          />
          <SingleSelectionLabeled
            label="Provincia"
            placeholder="Seleccione la provincia"
            idProperty="AfipProvinciaId"
            valueProperty="Nombre"
            options={provinces.content}
            disabled={disableOptions}
            value={enterpriseForm.content.province}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("province", target.value)
            }
            error={enterpriseForm.content.errors.province}
          />
          <SingleSelectionLabeled
            label="País"
            placeholder="Seleccione el país"
            idProperty="AfipPaisId"
            valueProperty="Nombre"
            options={countries.content}
            disabled={disableOptions}
            value={enterpriseForm.content.country}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("country", target.value)
            }
            error={enterpriseForm.content.errors.country}
          />
          <SingleSelectionLabeled
            label="Responsable"
            placeholder="Seleccione.."
            idProperty="AfipResponsableId"
            valueProperty="Nombre"
            options={responsables.content}
            disabled={disableOptions}
            value={enterpriseForm.content.responsable}
            onChange={({ target }) =>
              enterpriseForm.changePropertyTo("responsable", target.value)
            }
            error={enterpriseForm.content.errors.responsable}
          />
          <SingleSelectionLabeled
            label="Ing. Brutos"
            placeholder="Seleccione.."
            idProperty="IngBrutosCondicionId"
            valueProperty="Nombre"
            options={incomes.content}
            disabled={disableOptions}
            value={enterpriseForm.content.income}
            onChange={({ target }) => {
              enterpriseForm.changePropertyTo("income", target.value);
            }}
            error={enterpriseForm.content.errors.income}
          />
          <InputImageLabeled
            label="Imagen"
            disabled={disableOptions}
            onChange={({ currentTarget }) => {
              enterpriseForm.changePropertyTo("image", {
                link: URL.createObjectURL(currentTarget.files[0]),
                data: currentTarget.files[0],
              });
            }}
            error={enterpriseForm.content.errors.image}
          />
          <PreviewImageLabeled
            label="Vista previa de imagen"
            url={enterpriseForm.content.image.link}
          />
          <BeShowed show={!disableOptions}>
            <Buttons
              labelCancel="Cancelar"
              labelOk="Guardar"
              actionCancel={() => {
                window.history.back();
              }}
            />
          </BeShowed>
          <BeShowed show={disableOptions}>
            <Container className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <ButtonLabeled
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  window.history.back();
                }}
                label="Volver"
              />
            </Container>
          </BeShowed>
        </BeShowedOrLoading>
      </form>
    );
  } else {
    return <label>Cargando...</label>;
  }
};

export default FormEnterprise;
