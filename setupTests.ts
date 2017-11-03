import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as chaiEnzyme from "chai-enzyme";
import "ignore-styles";
import "jsdom-global/register";
import "./app/typings/css-modules";
import "./app/typings/zero-fill";

chai.use(chaiEnzyme()).use(chaiAsPromised);
