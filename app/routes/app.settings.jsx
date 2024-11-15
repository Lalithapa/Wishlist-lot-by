import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  TextField,
  InlineGrid,
  Button,
} from "@shopify/polaris";
import db from "../db.server";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export async function loader(){
  let settings = await db.settings.findFirst();
  return json(settings);
}
export async function action({request}){
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  await db.settings.upsert({
    where: {
      id: '1',
    },
    update: {
      id: '1',
      name:settings.name,
      description:settings.description,
    },
    create: {
      id: '1',
      name:settings.name,
      description:settings.description,
    },
  })
  console.log("first");
  return json(settings);
}

export default function Settings() {

  const settings  = useLoaderData();
  const [formState, setFormState] = useState(settings);
  return (
    <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and prefernces.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST" >
              <BlockStack gap="400">
                <TextField name="name" label="App Name" value={formState.name} onChange={((value)=> setFormState({...formState , name:value }))} />
                <TextField name="description" label="Description" value={formState.description} onChange={((value)=> setFormState({...formState , description:value}))} />
                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

