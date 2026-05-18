import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPositions } from "../../../../firebase/firestoreService";

import {
  experienceWrapperSx,
  experienceHeaderSx,
  experienceTitleSx,
  experienceGridItemSx,
  experienceCardSx,
  experienceCompanySx,
  experienceMetaSx,
  experienceDateSx,
  experienceDescriptionSx,
} from "../../../../styles/experienceStyles";

export default function ExperienceNodes({ id }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPositions();
      setPositions(data);
    };

    loadData();
  }, []);

  return (
    <Box id={id} sx={experienceWrapperSx}>
      <Box sx={experienceHeaderSx}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" sx={experienceTitleSx}>
            Experience
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {positions.map((exp, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={exp.id}
            sx={experienceGridItemSx}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              style={{ width: "100%" }}
            >
              <Box sx={experienceCardSx}>
                <Typography variant="h4" sx={experienceCompanySx}>
                  {exp.company}
                </Typography>

                <Typography variant="h4" sx={experienceMetaSx}>
                  {exp.title}
                </Typography>

                <Typography variant="h4" sx={experienceDateSx}>
                  {exp.start}
                  {exp.end ? ` - ${exp.end}` : " - Present"}
                </Typography>

                <Box>
                  {exp.description.map((desc, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={experienceDescriptionSx}
                    >
                      {desc}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}