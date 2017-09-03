
import React from 'react';
import { ButtonToolbar, Button , Col , Row , Panel , FormGroup , ControlLabel ,
        Form, FormControl , HelpBlock }
  from 'react-bootstrap/lib';

  class FormPanel extends React.Component {
      constructor(props) {
          super(props);
          this.state = FormPanel.defaultState(props.fields);
      }

      static defaultState(fields) {
        return JSON.parse(JSON.stringify({
          processing: false,
          status : "",
          fields: fields.reduce(((result, field) => {
            result[field.title] = { type: field.type, value: "" };
            return result;
          }), {})
        }));
      }

      handleChange(event) {
        let nodeId = event.target.id;
        let nodeValue = event.target.value;
        this.state.fields[nodeId].value = nodeValue;
        this.setState(this.state);
      }

      fieldsAreNotEmpty() {
        let empty = Object.keys(this.state.fields).reduce(
          (result, fieldName) => {
            if(this.state.fields[fieldName].value) {
              return true && result;
            } else {
              return false && result;
            }
          }, true);
        return empty;
      }

      onSubmit(event) {
        event.preventDefault();
        let inputData = Object.keys(this.state.fields).reduce(
          (result, field) => {
            result[field] = this.state.fields[field].value;
            return result;
          }, {})
        if(this.fieldsAreNotEmpty()) {
          this.props.onSubmit(inputData);
        }
        this.setState(FormPanel.defaultState(this.props.fields));
      }

      render() {
        if(this.state.processing) {
          return (
            <div className={this.props.size}>
              <Panel header={this.props.title}>
                <Row>
                  <img src="./img/loading.gif"/>
                </Row>
                <Row>
                  <h3 className="col-sm-4">
                    Processing your request, please wait
                  </h3>
                </Row>
              </Panel>
            </div>
          );
        } else {
          return(
              <div className={this.props.size}>
                <Panel header={this.props.title}>
                  <Form onSubmit={this.onSubmit.bind(this)}>
                    {Object.keys(this.state.fields).map((fieldName) =>
                      <FormGroup key={fieldName} controlId={fieldName}>
                        <ControlLabel>{fieldName}</ControlLabel>
                        <FormControl type={this.state.fields[fieldName].type}
                          value={this.state.fields[fieldName].value}
                          onChange={this.handleChange.bind(this)}
                        />
                      </FormGroup>
                    )}
                    {this.props.children}
                    <ButtonToolbar>
                      <Button
                          bsStyle='primary'
                          type="submit">
                        {this.props.submitName}
                      </Button>
                      <Button
                          bsStyle='danger'
                          onClick={() => {
                              this.setState(
                                FormPanel.defaultState(this.props.fields));
                              if(this.props.onReset) {
                                this.props.onReset();
                              }
                          }}>
                        Reset
                      </Button>
                    </ButtonToolbar>
                  </Form>
                </Panel>
              </div>
          )
        }
      }
  };

  export default FormPanel;
