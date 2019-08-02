import { mount } from "@vue/test-utils";
import Suggest from "Components/List/ItemForm/Suggest.vue";
import ListApi from "Api/list";

const getWrapper = propsData => mount(Suggest, { propsData });

let list;
describe("ItemForm/Suggest", () => {
  beforeEach(() => {
    list = ListApi.newList("test List");
    // eslint-disable-next-line no-undef
    addMultpleItems(list, ["Item 1", "item 2"]);
  });

  it("correct props", () => {
    const wrapper = getWrapper({ list, name: "it" });

    expect(wrapper.props("list")).toBe(list);
    expect(wrapper.props("name")).toBe("it");
  });
});
