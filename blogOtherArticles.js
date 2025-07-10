function loadOtherArticles() {
const categoryElement = document.getElementById('current-category');
  const slugElement = document.getElementById('current-slug');
  if (!categoryElement || !slugElement) {
    console.error('Error: #current-category or #current-slug element not found.');
    return;
  }
  const currentPageCategory = categoryElement.textContent.trim();
  const currentPageSlug = slugElement.textContent.trim();
  // console.log('Current Page - Category:', `"${currentPageCategory}"`, 'Slug:', `"${currentPageSlug}"`);
  const sliderContainer = document.querySelector('.slider');
  if (!sliderContainer) {
    console.error('Error: Slider container with class ".slider" not found.');
    return;
  }
  const allItemsInCMSOrder = sliderContainer.querySelectorAll('.blog-post-wrapper');
  // console.log(allItemsInCMSOrder.length)
  let potentiallyVisibleItems = [];
  // First, filter by category and exclude current slug
  allItemsInCMSOrder.forEach(function(item) {
    // console.log('i')
    const itemCategoryElement = item.querySelector('.category');
    const itemSlugElement = item.querySelector('.slug');
    if (itemCategoryElement && itemSlugElement) {
      const itemCategory = itemCategoryElement.textContent.trim();
      const itemSlug = itemSlugElement.textContent.trim();
      if (((itemCategory === currentPageCategory && itemSlug !== currentPageSlug) || (itemCategory === "Ecosystem" && currentPageCategory === "Case Studies" && itemSlug !== currentPageSlug)) && potentiallyVisibleItems.length < 5) {
        item.style.display = 'flex';
        potentiallyVisibleItems.push(item); // Add matching items to a new array
      }
      else {
        // item.style.width = '20px';
        item.remove()
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  loadOtherArticles()
});

  loadOtherArticles()