import { Grid } from "@mui/material";
import { TableCard } from "./TableCard";

export function DashboardTables({
  positionRows,
  projectRows,
  skillRows,
  onViewAll,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <Grid item xs={12} md={12} lg={4}>
        <TableCard
          title="Positions"
          headers={["TITLE", "COMPANY", "DATES", "ACTIONS"]}
          rows={positionRows}
          viewAllText="View all positions"
          onViewAll={() =>
            onViewAll("Positions", ["TITLE", "COMPANY", "DATES"], positionRows)
          }
          onAdd={() => onAdd("position")}
          onEdit={(item) => onEdit("position", item)}
          onDelete={(item) => onDelete("position", item)}
          emptyMessage="No positions found yet."
        />
      </Grid>

      <Grid item xs={12} md={12} lg={4}>
        <TableCard
          title="Projects"
          headers={["PROJECT", "STATUS", "ACTIONS"]}
          rows={projectRows}
          viewAllText="View all projects"
          onViewAll={() =>
            onViewAll("Projects", ["PROJECT", "STATUS"], projectRows)
          }
          onAdd={() => onAdd("project")}
          onEdit={(item) => onEdit("project", item)}
          onDelete={(item) => onDelete("project", item)}
          emptyMessage="No projects found yet."
        />
      </Grid>

      <Grid item xs={12} md={12} lg={4}>
        <TableCard
          title="Skills"
          headers={["SKILL", "CATEGORY", "ACTIONS"]}
          rows={skillRows}
          viewAllText="View all skills"
          onViewAll={() =>
            onViewAll("Skills", ["SKILL", "CATEGORY"], skillRows)
          }
          onAdd={() => onAdd("skill")}
          onEdit={(item) => onEdit("skill", item)}
          onDelete={(item) => onDelete("skill", item)}
          emptyMessage="No skills found yet."
        />
      </Grid>
    </>
  );
}