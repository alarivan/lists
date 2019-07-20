import { mount } from "@vue/test-utils";
import ListName from "Components/List/ListName.vue";

function getRenderedText(Component, propsData) {
  const wrapper = mount(Component, {
    propsData
  });

  return wrapper.text();
}

describe("ListName", () => {
  it("renders correctly with different names", () => {
    expect(
      getRenderedText(ListName, {
        name: "List Name"
      })
    ).toBe("List Name");

    expect(
      getRenderedText(ListName, {
        name: "Shopping"
      })
    ).toBe("Shopping");
  });
});
