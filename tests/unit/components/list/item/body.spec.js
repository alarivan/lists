import { mount } from "@vue/test-utils";
import ItemBody from "Components/List/Item/Body.vue";
import ListApi from "Api/list";
import ItemApi from "Api/item";

const getWrapper = propsData => mount(ItemBody, { propsData });

let list;
describe("ItemBody", () => {
  beforeEach(() => {
    list = ListApi.newList("test List");
  });

  it("renders correctly with props", () => {
    const item = ItemApi.newItem(list, "test Item");
    const wrapper = getWrapper({ list, item });

    expect(wrapper.props("list")).toBe(list);
    expect(wrapper.props("item")).toBe(item);
    expect(wrapper.find("[data-cy=item-order]").exists()).toBe(false);
    expect(wrapper.html()).toContain(item.name);
  });

  it("renders correctly for incomplete Item", () => {
    const item = ItemApi.newItem(list, "test Item");
    const wrapper = getWrapper({ list, item });

    expect(wrapper.html()).toContain("#icon-checkmark");
  });

  it("renders correctly for complete Item", () => {
    const item = ItemApi.newItem(list, "test Item", true);
    const wrapper = getWrapper({ list, item });

    expect(wrapper.html()).toContain("#icon-checkmark1");
  });

  it("renders order when list.options.sortByOrder is true", () => {
    list.options.sortByOrder = true;
    const item = ItemApi.newItem(list, "test Item");
    item.order = 1;
    const wrapper = getWrapper({ list, item });

    expect(wrapper.find("[data-cy=item-order]").exists()).toBe(true);
    expect(wrapper.find("[data-cy=item-order]").text()).toBe("1");
  });
});
