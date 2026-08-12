import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { formatDuration } from "../../features/resources/formatDuration";
import type { Resource } from "../../types/resource";

const MAX_TAGS = 3;

interface ResourceCardProps {
  resource: Resource;
  onSelect?: (resource: Resource) => void;
}

export const ResourceCard = ({ resource, onSelect }: ResourceCardProps) => {
  const { title, thumbnail, tags, durationMinutes, category } = resource;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        onClick={() => onSelect?.(resource)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="img"
          image={thumbnail}
          alt=""
          height={160}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {formatDuration(durationMinutes, category)}
          </Typography>

          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
            {tags.slice(0, MAX_TAGS).map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
