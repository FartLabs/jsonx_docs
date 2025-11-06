import { items } from "#/lib/resources/docs.ts";

/**
 * NavArrowsProps are the properties for the NavArrows component.
 */
export interface NavArrowsProps {
  currentPath: string[];
}

/**
 * NavArrows is a component that renders previous and next navigation arrows.
 */
export default function NavArrows(props: NavArrowsProps) {
  const currentPathString = props.currentPath.join("/");

  // Find current item index
  const currentIndex = items.findIndex((item) => {
    const itemPath = item.name.join("/");
    return itemPath === currentPathString;
  });

  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < items.length - 1
    ? items[currentIndex + 1]
    : null;

  const prevHref = prevItem
    ? (prevItem.href ?? `/${prevItem.name.join("/")}`)
    : null;
  const nextHref = nextItem
    ? (nextItem.href ?? `/${nextItem.name.join("/")}`)
    : null;

  return (
    <div class="nav-arrows">
      <div class="nav-arrows-inner">
        {prevHref
          ? (
            <a href={prevHref} class="nav-arrow nav-arrow-prev">
              <span class="nav-arrow-icon">←</span>
              <span class="nav-arrow-text">
                <span class="nav-arrow-label">Previous</span>
                <span class="nav-arrow-title">
                  {prevItem?.title || prevItem?.name[prevItem.name.length - 1]}
                </span>
              </span>
            </a>
          )
          : <div class="nav-arrow nav-arrow-prev nav-arrow-disabled"></div>}
        {nextHref
          ? (
            <a href={nextHref} class="nav-arrow nav-arrow-next">
              <span class="nav-arrow-text">
                <span class="nav-arrow-label">Next</span>
                <span class="nav-arrow-title">
                  {nextItem?.title || nextItem?.name[nextItem.name.length - 1]}
                </span>
              </span>
              <span class="nav-arrow-icon">→</span>
            </a>
          )
          : <div class="nav-arrow nav-arrow-next nav-arrow-disabled"></div>}
      </div>
    </div>
  );
}
