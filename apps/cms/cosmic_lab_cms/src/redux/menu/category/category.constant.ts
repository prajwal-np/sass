function CATEGORY() {
  const prefix = "category";
  return {
    STATE: prefix,
    GET_CATEGORY: `${prefix}/get_category`,
    GET_CATEGORIES: `${prefix}/get_categories`,
    ADD_CATEGORY: `${prefix}/add_category`,
    UPDATE_CATEGORY: `${prefix}/update_category`,
  };
}

const CATEGORY_CONSTANT = CATEGORY();
export default CATEGORY_CONSTANT;
