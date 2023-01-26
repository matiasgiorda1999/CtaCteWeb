import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { toMoneyFormat } from "../../../Utils/Pipes";

const CheckingAccountReport = ({
  enterprise,
  movements,
  dateIssued,
  dateFrom,
  dateTo,
  clientData,
}) => {
  let sumDebe = 0;
  let sumHaber = 0;
  let total = movements[0]?.SaldoIni || 0;
  const compNameOf = (letter, number) => {
    let compName = "";
    if (letter) compName += `${letter} `;
    compName += `0001 - ${"0".repeat(8 - number.toString().length)}${number}`;
    return compName;
  };

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={(styles.row, styles.center)}>
          <Image style={styles.width10} src={enterprise.imagenURL} />
        </View>
        <View>
          <Text style={styles.title}>{enterprise.nombre}</Text>
        </View>
        <View style={[styles.row, styles.padding1]}>
          <Text style={[styles.textHeader, styles.width50]}>
            {enterprise.calle} - {enterprise.numeroCalle} -{" "}
            {enterprise.Localidad} - {enterprise.Provincia}
          </Text>
        </View>
        <View style={[styles.row, styles.padding1]}>
          <Text style={[styles.textHeader, styles.width30]}>
            {enterprise.Responsable}
          </Text>
          <Text style={[styles.textHeader, styles.width30]}>
            CUIT {enterprise.CUIT}
          </Text>
          <Text style={[styles.textHeader, styles.width30]}>
            Ing. Brutos {enterprise.IngBrutoCondicion}
          </Text>
        </View>
        <View style={styles.box}>
          <View style={[styles.row, styles.borderBottom]}>
            <View
              style={[
                styles.column,
                styles.width40,
                styles.padding1,
                styles.borderRight,
              ]}
            >
              <Text style={[styles.textHeader, styles.textCenter]}>
                Fecha de Emisión {dateIssued.toLocaleDateString()}
              </Text>
            </View>
            <View
              style={[
                styles.column,
                styles.width20,
                styles.padding1,
                styles.borderRight,
              ]}
            >
              <Text style={[styles.textHeader, styles.textCenter]}>
                Período de Consulta
              </Text>
            </View>
            <View
              style={[
                styles.column,
                styles.width20,
                styles.padding1,
                styles.borderRight,
              ]}
            >
              <Text style={[styles.textHeader, styles.textCenter]}>
                {dateFrom.toLocaleDateString()}
              </Text>
            </View>
            <View style={[styles.column, styles.width20, styles.padding1]}>
              <Text style={[styles.textHeader, styles.textCenter]}>
                {dateTo.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.borderBottom]}>
            <View
              style={[
                styles.width20,
                styles.column,
                styles.padding1,
                styles.borderRight,
              ]}
            >
              <Text style={[styles.textHeader, styles.textCenter]}>Cuenta</Text>
            </View>
            <View style={[styles.width80, styles.column, styles.padding1]}>
              <View style={[styles.row, styles.textHeader]}>
                <Text style={styles.width100}>{clientData.Nombre}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.textHeader, styles.width20]}>
                  Domicilio:
                </Text>
                <Text style={[styles.textHeader, styles.width30]}>-</Text>
                <Text style={[styles.textHeader, styles.width10]}>Nro:</Text>
                <Text style={[styles.textHeader, styles.width40]}>-</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.textHeader, styles.width20]}>
                  Localidad:
                </Text>
                <Text style={[styles.textHeader, styles.width80]}>
                  {clientData.Localidad}
                </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.textHeader, styles.width20]}>CUIT:</Text>
                <Text style={[styles.textHeader, styles.width30]}>
                  {clientData.CUIT}
                </Text>
                <Text style={[styles.textHeader, styles.width10]}>IVA:</Text>
                <Text style={[styles.textHeader, styles.width40]}>
                  {clientData.Responsable}
                </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.textHeader, styles.width20]}>
                  Ing. Brutos:
                </Text>
                <Text style={[styles.textHeader, styles.width80]}>
                  {clientData.IngBrutoCondicion}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, styles.padding1, styles.borderBottom]}>
            <Text style={[styles.textHeader, styles.width100]}>
              RESUMEN DE CUENTA
            </Text>
          </View>
          <View style={[styles.row, styles.padding1, styles.borderBottom]}>
            <Text style={[styles.textHeader, styles.width10]}>Fecha</Text>
            <Text style={[styles.textHeader, styles.width20]}>Detalle</Text>
            <Text style={[styles.textHeader, styles.width15]}>Comp</Text>
            <Text style={[styles.textHeader, styles.width15, styles.textRight]}>
              Debe
            </Text>
            <Text style={[styles.textHeader, styles.width15, styles.textRight]}>
              Haber
            </Text>
            <Text style={[styles.textHeader, styles.width15, styles.textRight]}>
              Saldo
            </Text>
            <Text style={[styles.textHeader, styles.width5, styles.textCenter]}>
              Vto.
            </Text>
            <Text style={[styles.textHeader, styles.width5, styles.textCenter]}>
              Canc.
            </Text>
          </View>
          <View style={[styles.row, styles.padding1]}>
            <Text style={[styles.textNumber, styles.width75]}>
              Saldo Anterior
            </Text>
            <Text style={[styles.textNumber, styles.width10]}>{total}</Text>
          </View>
          {movements.map(
            (
              {
                Fecha,
                Detalle,
                Letra,
                Numero,
                Debe,
                Haber,
                Vencimiento,
                Cancelado,
              },
              index
            ) => {
              const debe = Debe || 0;
              const haber = Haber || 0;
              sumDebe += debe;
              sumHaber += haber;
              total = total + haber - debe;
              return (
                <View style={[styles.row, styles.padding1]} key={index}>
                  <Text style={[styles.text, styles.width10]}>
                    {new Date(Fecha).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.text, styles.width20]}>{Detalle}</Text>
                  <Text
                    style={[
                      styles.text,
                      styles.width15,
                      { textAlign: "center" },
                    ]}
                  >
                    {compNameOf(Letra, Numero)}
                  </Text>
                  <Text style={[styles.textNumber, styles.width15]}>
                    {toMoneyFormat(debe).toLocaleString()}
                  </Text>
                  <Text style={[styles.textNumber, styles.width15]}>
                    {toMoneyFormat(haber).toLocaleString()}
                  </Text>
                  <Text style={[styles.textNumber, styles.width15]}>
                    {toMoneyFormat(total).toLocaleString()}
                  </Text>
                  <Text style={[styles.text, styles.width5, styles.textCenter]}>
                    {new Date(Vencimiento).toLocaleDateString}
                  </Text>
                  <Text style={[styles.text, styles.width5, styles.textCenter]}>
                    {Cancelado ? "SI" : "NO"}
                  </Text>
                </View>
              );
            }
          )}
          <View style={[styles.row, styles.padding1, styles.borderTop]}>
            <Text style={[styles.textNumber, styles.width45]}>TOTAL</Text>
            <Text style={[styles.width15, styles.textNumber]}>
              ${toMoneyFormat(sumDebe).toLocaleString()}
            </Text>
            <Text style={[styles.width15, styles.textNumber]}>
              ${toMoneyFormat(sumHaber).toLocaleString()}
            </Text>
            <Text style={[styles.width15, styles.textNumber]}>
              ${toMoneyFormat(total).toLocaleString()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  width5: {
    width: "5%",
  },
  width10: {
    width: "10%",
  },
  width15: {
    width: "15%",
  },
  width20: {
    width: "20%",
  },
  width30: {
    width: "30%",
  },
  width40: {
    width: "40%",
  },
  width45: { width: "45%" },
  width50: {
    width: "50%",
  },
  width55: {
    width: "55%",
  },
  width60: {
    width: "60%",
  },
  width70: {
    width: "70%",
  },
  width75: {
    width: "75%",
  },
  width80: {
    width: "80%",
  },
  width90: {
    width: "90%",
  },
  width100: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  padding1: {
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
  },
  textHeader: {
    fontSize: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 8,
  },
  textNumber: {
    fontSize: 8,
    textAlign: "right",
  },
  textRight: {
    textAlign: "right",
  },
  box: {
    borderStyle: "solid",
    border: "1px",
    borderColor: "black",
  },
  borderBottom: {
    borderStyle: "solid",
    borderBottomWidth: "1px",
    borderColor: "black",
  },
  borderTop: {
    borderStyle: "solid",
    borderTopWidth: "1px",
    borderColor: "black",
  },
  borderRight: {
    borderStyle: "solid",
    borderRightWidth: "1px",
    borderColor: "black",
  },
  textCenter: {
    textAlign: "center",
  },
  column: {
    flexDirection: "column",
  },
});

export default CheckingAccountReport;
