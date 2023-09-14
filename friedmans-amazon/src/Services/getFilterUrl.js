
export const getFilterUrl = (searchFromUrl, filter, skipPathName) => {
  const searchParams = new URLSearchParams(searchFromUrl);

  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const filterPage = filter.page || page;
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterRating = filter.rating || rating;
  const filterPrice = filter.price || price;
  const filterOrder = filter.order || order;

  let link = `${skipPathName ? '' : '/search?'}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`;
  
  // let link = `${skipPathName ? '' : '/search?'}`;
  // link += `category=${filterCategory}&page=${filterPage}&query=${filterQuery}&order=${filterOrder}&price=${filterPrice}&rating=${filterRating}`;

  return link;
};
