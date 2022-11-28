const soapRequest = require("easy-soap-request");
const xml2js = require("xml2js");

exports.checkSubscription = async function (penyanyi_id, user_id) {
  const url = "http://localhost:8081/service/subscription";
  const headers_req = {
    "Content-Type": "text/xml;charset=UTF-8",
  };
  const xml = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
          <checkSubscription xmlns="http://services.binotify/">
              <arg0 xmlns="">${penyanyi_id}</arg0>
              <arg1 xmlns="">${user_id}</arg1>
          </checkSubscription>
      </Body>
  </Envelope>`;

  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: headers_req,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      var isSubscribed =
        result["S:Envelope"]["S:Body"][0]["ns2:checkSubscriptionResponse"][0]
          .return[0];
      if (statusCode == 200 && isSubscribed) {
        return true;
      } else {
        return false;
      }
    });
  })();
};
