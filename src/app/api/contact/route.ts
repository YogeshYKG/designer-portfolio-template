import { NextResponse } from "next/server";

import { resend } from "@/lib/mail";
import { getDesigner } from "@/lib/designers";

export async function POST(req: Request) {
  try {
    debugger
    const body = await req.json();

    const { slug, name, email, mobile } = body;

    // Validation
    if (!slug || !name || !email || !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find designer
    const designer = getDesigner(slug);

    if (!designer) {
      return NextResponse.json(
        {
          success: false,
          message: "Designer not found.",
        },
        {
          status: 404,
        }
      );
    }

    const designerEmail = designer.profile.email;
    const designerName = designer.profile.name;

    /**
     * Email to designer
     */
    await resend.emails.send({
      from: "Portfolio <guptayogesh484.00@gmail.com>",
      to: designerEmail,
      subject: `New Portfolio Enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p>You have received a new enquiry from your portfolio.</p>

        <hr />

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>

        <hr />

        <p>Portfolio: ${slug}</p>
      `,
    });

    /**
     * Confirmation email to visitor
     */
    await resend.emails.send({
      from: "Portfolio <guptayogesh484.00@gmail.com>",
      to: email,
      subject: `Thanks for contacting ${designerName}`,
      html: `
        <h2>Hello ${name},</h2>

        <p>
          Thank you for reaching out to <strong>${designerName}</strong>.
        </p>

        <p>
          Your enquiry has been received successfully.
        </p>

        <p>
          We will get back to you as soon as possible.
        </p>

        <br />

        <p>
          Regards,<br/>
          ${designerName}
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}