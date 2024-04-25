/**
 * Foot is the site footer.
 */
export default function Foot(
  props: { year?: number } = { year: new Date().getFullYear() },
) {
  return (
    <footer class="foot">
      <hr />
      <p>
        © {props.year}{" "}
        <a href="https://github.com/FartLabs">
          <strong>@FartLabs</strong>
        </a>{" "}
        <a class="fl-icon" href="/">🧪</a>
      </p>
    </footer>
  );
}
