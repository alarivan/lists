import { mount } from "@vue/test-utils";
import Icon from "Components/common/Icon.vue";

function getRenderedIcon(Component, propsData) {
  const wrapper = mount(Component, {
    propsData
  });

  return wrapper.html();
}

describe("Icon", () => {
  it("renders correctly with different icons", () => {
    expect(
      getRenderedIcon(Icon, {
        href: "#icon-test"
      })
    ).toContain("#icon-test");

    expect(
      getRenderedIcon(Icon, {
        href: "#icon-two"
      })
    ).toContain("#icon-two");
  });

  it("renders correctly with different sizes", () => {
    expect(
      getRenderedIcon(Icon, {
        href: "#icon-test",
        size: "md"
      })
    ).toContain("icon-md");

    expect(
      getRenderedIcon(Icon, {
        href: "#icon-test",
        size: "lg"
      })
    ).toContain("icon-lg");
  });
});
